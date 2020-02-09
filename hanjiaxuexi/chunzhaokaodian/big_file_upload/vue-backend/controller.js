//通过看上传的文件的hash值的目录或文件名
const path=require('path');
const fse=require('fs-extra');
const multiparty=require('multiparty'); //记得安装 yarn add multiparty

const resolvePost=req=>new Promise(resolve=>{ //比较耗时
    //post发送请求来的时候不像get请求(url+查询的参数)比较小，一次性就能传过来，post的内容比较多数据是慢慢的来的
    let chunk="";
    req.on("data",data=>{
        chunk+=data;//这个数据也就是二进制流，一直做js里字符串的拼接，拼完了后触发end事件
    }) //监听了req的data对象
    req.on("end",()=>{
        console.log('end',chunk);
        resolve(JSON.parse(chunk)) //再点一次上传会出现两个verify
        // JSON.parse() 方法用于将一个 JSON 字符串转换为对象
        //这个chunk是字符串的拼接
    })
    // 复制server文件夹中main.js中解决跨域问题的代码到index.js
})

const mergeFileChunk = async (filePath,fileHash,size) => {
    //在合并的时候就是要找到filePath路径下所有的子文件，通过文件流的写入方式写入最后的文件(在前端拆了，现在又在后端合)
    const chunkDir =path.resolve(UPLOAD_DIR,fileHash);
    const chunkPaths = await fse.readdir(chunkDir);//把chunkDir目录下的文件都读出来
    //把读出来的文件从小到大排个序,然后按顺序写入
    chunkPaths.sort((a,b) =>a.split("-")[1] - b.split("-")[1]);
    await Promise.all(
        //要写入，首先每个都是一个promise,就是要打开每个片段，然后把它们读进内存，然后把他们写入进去，所以我们使用promise.all
        //转变成为每个chunkPath,index(第几个)
        chunkPaths.map((chunkPath,index) =>pipeStream(
            path.resolve(chunkDir,chunkPath),
            fse.createWriteStream(filePath,{
                // 从哪个位置开始写，按序写下去
                start:index*size,
                end:(index+1)*size
            })
            //pipeStream会接收createWriteStream的callback,使用path.resolve流向最后的文件，所以现在在前面定义pipeStream
        ))
    )
}
const UPLOAD_DIR=path.resolve(__dirname,"..","target");

const extractExt = filename =>filename.slice(filename.lastIndexOf("."), filename.length)
// console.log(extractExt(filename),'===='); 为什么不能在这打印呢？因为这里还没有拿到文件名，这里的filenamei还是个未定义的。

const pipeStream = (path,writeStream) =>new Promise(resolve =>{ //返回一个prmise的resolve的能力
    const readStream = fse.createReadStream(path);//根据其中的某一段的地址
    readStream.on('end',()=>{ //一定要加.on 不然TypeError:readSteam is not function
        //完全读完就调用resolve
        resolve();
    });
    //调用流的pipe,打开一个可读流，再流向 writeStream(就是前面的)fse.createWriteStream(filePath,{，会不断地向filePath写入
    //录完了之后就resolve()，然后到Promise.all(mergeFileChunk()的),然后就可以把结果返回async handleMerge(req,res)的await mergeFileChunk
    //清空一下target文件在实验一下
    readStream.pipe(writeStream); 
})
// 模块化输出：
module.exports=class{
    async handleVerifyUpload(req,res){
        // res.end('verify');
        //服务器端有没有这个文件省的同样的文件再上传一次
        //要拿到post的data,会使用一个叫bodyParser
        const data=await resolvePost(req);//请求对象里就会有这个数据
        //然后比对hash看上传的目录里面有没有一样的文件
        // 将数据解构出来
        const {fileHash,filename}=data;
        const ext=extractExt(filename); //通过文件名拿一下后缀
        // yb.jpg (回取到点及后面的后缀)
        console.log(ext);
        const filePath=path.resolve(UPLOAD_DIR,`${fileHash}${ext}`);
        console.log(filePath);
        if (fse.existsSync(filePath)){
            res.end(
                JSON.stringify({
                    shouldUpload:false
                })
            )
        }else{
            res.end(
                JSON.stringify({
                    shouldUpload:true,
                    uploadedList:[]
                })
            )
        }
    }
    async handleFormData(req,res){ //接受外面传过来的req,res
        // req得到请求的数据，res返回
        // 使用multiparty处理带有文件上传的表单
        const multipart=new multiparty.Form(); //记得引入multipart
        multipart.parse(req,async(err,fields,files)=>{
            if(err){
                console.log(err);
                res.status=500; //错误日志，返回一个500错误
                res.end("process file chunk failed");
                return ;
            }
            //成功就解构出各个字段
            const [chunk]=files.chunk;//是文件，在files
            const [hash]=fields.hash;  //是数据，在fields
            const [fileHash]=fields.fileHash;
            const [filename]=fields.filename;
            // console.log(chunk,hash,fileHash,filename);
            const filePath=path.resolve(UPLOAD_DIR,`${fileHash}${extractExt(filename)}`)
            //上传这个文件的路径，是以整个文件的hash来形成的再加上他的后缀
            console.log(filePath); //为什么输出5个呢？
            const chunkDir=path.resolve(UPLOAD_DIR,fileHash);
            // console.log(fse.existsSync(filePath)); 此时是false.还没有上传过
            if(fse.existsSync(filePath)){//有没有这个东西
                res.end("file exist");
                return; 
            } 
            if(!fse.existsSync(chunkDir)){
                //整个的目录地址有没有，target没有的话创建：
                await fse.mkdirs(chunkDir);//big_file_upload文件夹下面就有了target
            }
            await fse.move(chunk.path,path.resolve(chunkDir,hash)); //把文件移进去。chunk.path表示文件在暂存的地方，要移到服务器的目录下path.resolve(chunkDir,hash)切片的地址
            res.end("received file chunk"); //然后再次回到前端

        })
    }
    async handleMerge(req,res){ 
        // 每次都要重新定义。复用resolvePost拿到数据
        const data = await resolvePost(req);
        //结构一下拿到的数据
        const { fileHash,filename,size } = data
        const ext = extractExt(filename);//通过filename名字拿到后缀，然后这里就会结构.jpeg
        const filePath=path.resolve(UPLOAD_DIR,`${fileHash}${ext}`);
        console.log(filePath); //可以再把target清空一下试验看效果
        // 开始合并吧
        await mergeFileChunk(filePath,fileHash,size); //记得在前面要const
        res.end( //合并完了之后
            JSON.stringify({
                code:0, //表示OK
                message:"file merged success"
            })
        )
    }
}
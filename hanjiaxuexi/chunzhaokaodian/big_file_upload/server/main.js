//处理提交，后端
const http=require('http');
const path=require('path');
const multiparty=require('multiparty');//第三方库，搞定表单文件上传
const server=http.createServer(); //是最基本的node启动web服务的api
const UPLOAD_DIR=path.resolve(__dirname,".","target");
const fse=require('fs-extra');

server.on("request",async (req,res)=>{
    // res.end("hello");
    res.setHeader("Access-Control-Allow-Origin","*"); //解决跨域问题的一种方法，在头部信息里返回有没有权限去控制的时候返回*,就是说任何人都有可以访问
    res.setHeader("Access-Control-Allow-Headers","*");
    // res.end("hello");

    //如果用户的请求来自这个：
    if(req.url == '/'){
        //把chunk,name拿出来，存好yb(我们先把target目录删掉，到时候会在target创建以文件名为目录名的目录放blob)
        const multipart=new multiparty.Form();//使用这个npm包，可以用这个看post过来的表单数据
        // console.log(multipart);//打印看下

        multipart.parse(req,async (err,fields,files)=>{ //解析本次请求（都会在files中），要花时间
            if(err){
                return ;
            }
            // console.log(files); 会拿到chunk数据
            const [chunk]=files.chunk;//解构出来chunk,拿到文件块
            const [filename]=fields.filename;//拿到文件名 除了文件的其他字段multipart会解析在fields
            // console.log(filename);拿到了各个blog的文件名
            const dir_name=filename.split('-')[0];
            const chunkDir=path.resolve(UPLOAD_DIR,dir_name);
            if(!fse.existsSync(chunkDir)){
                await fse.mkdirs(chunkDir); //target/yb就创建了
            }else if (req.url =='/merge'){
                res.end('ok');
            }
            // console.log(chunk.path);
            await fse.move(chunk.path,`${chunkDir}/${filename}`);
        })
    }
});
server.listen(3000,()=>console.log("正在监听3000端口"));
//从8080端口访问3000端口是一个跨域问题，怎么办？
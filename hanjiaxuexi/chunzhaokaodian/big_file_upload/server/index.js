const path=require('path');
const fse=require('fs-extra');//fse的npm包，是fs模块的一个扩展包文件读写删除移动目录。。。
// yarn add fs-extra

const UPLOAD_DIR=path.resolve(__dirname,".","target");
// console.log(UPLOAD_DIR);
const filename='yb';
const filePath=path.resolve(UPLOAD_DIR,'..',`${filename}.jpeg`);//变成路径,``用ES6字符串模板
// console.log(filePath);

const pipeStream=(path,writeStream)=>new Promise(resolve=>{
    const readStream=fse.createReadStream(path);//创建可读流
    readStream.on("end",()=>{
        fse.unlinkSync(path);//删除文件地址（原来块的地址)
        resolve();//告诉Promise.all这次chunk里的可读到可写已完成
    })
    readStream.pipe(writeStream);//流入writeStream,由可读流流入可写流就是流的pipe方法
})

//负责合并文件块
const mergeFileChunk=async(filePath,filename,size)=>{
    // console.log(filePath,filename,size);
    // 大文件上传时，设计的后端思想是，每个要上传的文件，先以文件名为target为目录名，把几个blob都上传到这个目录，全部上传完后再合并
    //node文件合并是肯定可以的，因为node有流能力stream
    //文件blob上传前要加上index，等下拼的时候就知道按什么顺序拼接
    const chunkDir=path.resolve(UPLOAD_DIR,filename);
    // console.log(chunkDir);
    const chunkPaths=await fse.readdir(chunkDir);//读一下这个文件下有多少个文件 fse是fs的一个封装，让我们更好的使用fs
    // console.log(chunkPaths);
    chunkPaths.sort((a,b)=>a.split("-")[1]-b.split("-")[1]); //sort根据文件最后一位进行升序排序split切割由此可见-前面的是[0],后面的是[1]
    // console.log(chunkPaths,"++");
    //每一个区块的内容写入最后的文件也就是yb.jpeg,都是一个promise
    await Promise.all(
        chunkPaths.map((chunkPath, index)=>{
            pipeStream(
                path.resolve(chunkDir,chunkPath),
                fse.createWriteStream(filePath,{
                    start:index *size,
                    end:(index+1)*size
                })
            )
        }) //拿出这个数组来,pipeStream方法（是我们要去写的），每一个chunk(chunkPath)都可以创建一个可写流,写到filePath里按顺序写（每个分别写在哪）

    )
    // console.log('文件合并成功');
    fse.rmdirSync(chunkDir);//移除文件
}
mergeFileChunk(filePath,filename,0.5*1024*1024);
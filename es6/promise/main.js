// 读取磁盘中的文件到内存，fs.readFile()返回文件流buffer
const fs =require('fs');
// fs.readFile('./d.txt',function(err,res){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(res.toString());//buffer变成文件
// })
function readFile(){
    // 实现先后读取a,b,c文件
    // 用回调函数
    // fs.readFile('./a.txt',function(err,res){
    // if(err){
    //     console.log(err);
    //     return;
    // }
    // console.log(res.toString());//buffer变成文件
    // })
    // fs.readFile('./b.txt',function(err,res){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log(res.toString());
    // })
    // fs.readFile('./c.txt',function(err,res){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log(res.toString());
    // })

    const aFile=fs.readFileSync('a.txt');
    // console.log(aFile);
    console.log(aFile.toString());
    const bFile=fs.readFileSync('b.txt');
    console.log(bFile.toString());
    const cFile=fs.readFileSync('c.txt');
    console.log(cFile.toString());
}
readFile();
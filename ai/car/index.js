
const fs = require('fs');//filesystem 内置模块
const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;//图片分类客户端 引入百度的百度识别图片
//console.log('hello node');

const image =fs.readFileSync("timg.jpg").toString("base64");//同步读取文件 会等等 就不用加回调函数 图片字符串化

//onst client = new AipImageClassifyClient(APP_ID,API_KEY,SECERT_KEY);找创建的应用的ID
const client = new AipImageClassifyClient('17711772','c21tl624R84Y7hqLjVjiF9OH','yV3sBn5IiBK2E8wT8oGnTRZn2sArUBri');
client
    .carDetect(image)
    .then(function(result) {
        console.log(result);
    })
// console.log(image');
// AipImageClassifyClient
//（异步读取文件）读取文件 加回调函数 从内存取数据回来调用 需要时间
//文件在磁盘里 js文件在内存之中运行 I/O操作
// fs.readFile('./texfft.txt',function(err,data) {
//     if (err){
//         return console.error(err);//假设写一个硬盘中没有的文件
//     }
//     console.log(data.toString());
// })
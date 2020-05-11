// node中也有发请求的需求的 http中有发请求的方法的
// node中也封装了的
const http = require('http');
// 都是node设计好的api request
http.request({
    headers:{},
    url:{}
})

// net模块
// TCP传输是面向字节流的 net是创建TCP链接的一个方法 http就是用net创建的
// 用更原始的
// 发起请求
const net = require('net');
const fs = require('fs');
// TCP是面向连接的
const client = net.createConnection({
    // 默认是localhost,所以不用指定post
    port: 8088
},() =>{
    // 拼报文 write也是基于node进行的一个封装 发送报文
    // 中间有一个/当前的路经 HTTP要大写记得
    client.write('POST / HTTP/1.1\r\n'); //请求行
    // 因为是两端在进行的
    client.write('HOST: 127.0.0.1\r\n');
    client.write('Content-Length: 7\r\n'); //响应头 长度为7
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');// 传过去的编码类型 //这个编码是哪里来的？ index.html form表单上有一个编码，把url以&拼接的格式
    client.write('\r\n')//换行
    client.write('abc=456')//实体
    // client.write('\r\n')//换行
    
    // 以TCP形式传给后端，请求报文，然后后端也传一个响应报文，格式其中请求行（状态行）是不一样的
})
client.on('data', (data) => {
    console.log('data');
})
client.on('end', (data) => {
    console.log('disconnect');
})

// 响应的报文
// 我们用流的形式
const write = fs.createWriteStream('./res.txt');
// 文件流都能用pin的方式
client.pipe(write);
// 没有响应ok回来 
// 流是分段传输的
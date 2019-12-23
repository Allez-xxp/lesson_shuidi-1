const fs=require('fs');//引进文件模块
const http=require('http');

http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html','utf-8'));
})//启动web服务器
.listen(1234,()=>{
    console.log('listened 1234');
})
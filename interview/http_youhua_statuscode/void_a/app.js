var http = require('http');
http.createServer((req, res) => { //req和res是因为http在0.9版本的时候他就是应答模式，所以有req,res，双方都有发送信息和接受信息的能力在TCP层的3次握手
    // seq是请求的number，ack
    if(req.url == '/new_page_not_go') {
        res.writeHead(204); //2开头的表示成功，204成功了，不过没什么可以返回的
        return
    }
    //发送一个响应头给请求。
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    // 连接后就有一个Tcp管道，就能写入文件流
    // 写入字节码
    res.write("hello world");
    res.end(`
        <html>
            <head></head>
            <body>
                <a href="/new_page_not_go">跳转</a>
            </body>
        </html>
    `)
}).listen(3000) 
// node app.js
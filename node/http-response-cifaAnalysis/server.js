const http = require('http');
http.createServer((req, res) =>{
    // transfer-encoding chunked 分段
    res.writeHead(200, {
    'Transfer-Encoding':'chunked'

    })
    res.end('ok');
}).listen(8088,() => {
    console.log('8088');
})
// 这个是服务端


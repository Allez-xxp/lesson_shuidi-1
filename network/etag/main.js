//计算机网络 缓存
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  if (req.url == '/' || req.url == '' || req.url == '/index.html') { //展示首页
    //读取index.html 把它通过http响应发送给客户端 web是建立在http协议上的 
    // web就是一个应答模式，所以一个请求一个res
    // node 异步无阻塞的 高并发的 js 异步
    fs.readFile('./index.html', function(err, file) { //使用回调方式
      // http请求头
      res.setHeader('Content-Type', 'text/html');//告诉一下对方我们的发送的格式是text/html
      res.writeHead('200', 'OK'); //写入我们的响应头 将http 状态码写入进去 
      res.end(file);
    })
  } else if (req.url == '/cache.jpeg') {
    fs.readFile('./cache.jpeg', function(err, file) {
      // file
      // 2. 用户带着if-none-match，不是第一次请求，服务器端会带上if-none-match
      console.log(req.headers)
      if (!req.headers['if-none-match']) {
        //用户第一次请求 使用文件完整的带宽
        res.setHeader('Content-Type', 'images/jpeg');
        res.setHeader('200', 'OK');//？
        //etag 发送给客户端, 文件标识是多少， 
        // 未来文件修改了，它会发一个新的
        res.setHeader('Etag', 'ffff');//缓存 唯一标志,我们现在是服务器端，返回文件的同时带上etag
        // res.setHeader()
        res.end(file);//要发送的内容放在这里
      } else {
        //再次
        // 1. 没有改变
        // 2. 变了
        if (req.headers['if-none-match'] == 'ffff') {
          // 用户没有修改 
          // http status code 304 文件没有修改，GET请求执行
          // 200 NO, 返回文件内容
          // http协议， 拟人化，工作  
          res.writeHead('304');
          res.end();//省带宽
        } else {//重新发送文件
          res.setHeader('Content-Type', 'images/png');
          res.setHeader('Etag', 'ffff'); //唯一标识符
          res.writeHead('200', 'OK');
          res.end(file);
        }
      }
      // 1. 第一次请求
      console.log(err, file);
      
    })
  }
})
//http.createServer的端口
.listen(8888);
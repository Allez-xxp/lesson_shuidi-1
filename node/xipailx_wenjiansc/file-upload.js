// 创建一个http服务
const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
  if (req.url === "/file" && req.method.toLowerCase() === "post") {
    parseFile(req, res) //post方式请求file的话，就进行文件解析流程
  } else {
    //   req,res都是流，所以可以直接pipe
    fs.createReadStream('./index.html').pipe(res);
  }
})
function parseFile(req, res) {
  req.setEncoding("binary"); //编码设成二进制的
  let body = "";
  let fileName = "";
  // 边界字符
  let boundary = req.headers['content-type']
    .split('; ')[1]
    .replace("boundary=", "")
  
  req.on("data", function(chunk) {
    body += chunk; //流是分段传输的
  });
//   拿到整个body了接下来就是切割，因为文件上传是用分隔符隔开的，是容请求头中的boundary中传过来的
  req.on("end", function() {
    // 按照分解符切分
    // 上传文件可以选多个，会用boundary分隔开，我们这里只处理一个
    // 只处理一个，拿到非ASCII码的内容
    // 我们要的内容在content-type后面，解析起点的内容
    // 每一行都以空格换行结尾\r\n 我们就照这个位置 后面还有一个空行，那再加一个\r\n
    // 只处理单个文件 只能处理 jpeg
    let lines = body.split('Content-Type: image/jpeg\r\n\r\n');
    let end = lines[1].indexOf('--' + boundary + '--') - 2 //去掉标识符，就是里面的内容//固定的boundary前面--后面--
    let binary = lines[1].substring(0, end); //内容
    // 输出到文件... ; 内容，就是我们取出来的那段内容; 编码，二进制编码； 回调
    fs.writeFile('upload.jpg', binary, {encoding: 'binary' }, (err) => {  //注意这个方法有3个参数
      if (err) {
        console.log(err);
      }
    })
    // 只处理
    res.end('ok')

  })
}

server.listen(7787)
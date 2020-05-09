const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {

    // 返回html文件，文件读出来， 文件内容写回去
    // 按原来的方式写的话
    fs.readFile('./index.html','utf8', (err, info) => {
        res.end(info);
    })
})
.listen(8081, ()=> {
    console.log('8081');
})
// http中req，res就是一个流，req，res中对象的实现都继承了node的流这个模块
// 继承了node中的两个模块
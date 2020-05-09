const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {

    // 返回html文件，文件读出来， 文件内容写回去
    const readStream = fs.createReadStream('./index.html');
    // 别人本身就是一个流，所以只要pipe回去就行
    readStream.pipe(res);
})
.listen(8080, ()=> {
    console.log('8080');
})
// http中req，res就是一个流，req，res中对象的实现都继承了node的流这个模块
// 继承了node中的两个模块
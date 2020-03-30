const fs = require('fs');

//将路由中间件的设置放在这里封装
module.exports = app => {
  //同步读取目录
  fs.readdirSync(__dirname).forEach( file => {
    // console.log(file)
    if (file === 'index.js') {
      return;
    }
    //koa的语法
    const route = require(`./${file}`)
    app.use(route.routes())  //这是koa的写法 启用路由
    .use(route.allowedMethods())  //get post
  })
}
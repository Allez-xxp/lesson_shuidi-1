const express = require('express'); //yarn add express
const app = express();//得到应用
//将db.js引入进来，import是es6的模块化，node中还是普遍支持es5的require
require('./db/db')(app); 

//部署上线
//2.添加一个路由  //后端等着你把vue 打包好的静态文件给你一个包
app.use('/',express.static(__dirname + '/web'))
// express.static是express提供的静态扶服务，可以将打包的静态包dist直接显示出来
//1.
app.listen('3000',async(req,res)=>{
    console.log('http://localhost:3000');
})
// 部署上线
// 1. vue 写完后 通过build生成一包静态文件，以html为入口文件index.html,再加上app.js,就能通过veu的MVVM响应，
// 2. 把静态文件包放到服务器目录下（这里是server),这个目录就是会放到阿里云服务器上的，会部署一个node环境，就能把静态前端页面渲染，就能浏览这个网站
// 3. 把vue网站发布？ 打开server终端 node index.js
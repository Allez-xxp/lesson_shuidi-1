// 后台
const express = require('express');
const app = express();
const path = require('path');
//路由对象
//api 登录
const router = require('./routes/index.js') //独立出去
//把app传过去,之后就能挂载到app上
router(app);


//web express.static启动静态服务器
app.use('/', express.static(path.join(__dirname, 'web')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.listen("3000", () => {
    console.log('api 服务器上线了');
})
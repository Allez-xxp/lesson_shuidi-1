// 后台
const express = require('express');
const app = express();
//路由对象
const router = require('./routes/index.js') //独立出去
//把app传过去,之后就能挂载到app上
router(app);

app.listen("3000", () => {
    console.log('api 服务器上线了');
})
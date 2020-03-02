const express = require('express') //在express中给路由添加方法,先express的路由
const router = express.Router();//拿到路由对象

// 添加post方法,为前端要请求他做准备
// http://localhost:3000/admin/login
router.post('/login',(req,res)=>{
    res.send({
        //希望满足前端的请求，status==1
        //登录业务忽略
        status:1,
        message: '登录成功'
    })
})
//向外输出路由
module.exports = router
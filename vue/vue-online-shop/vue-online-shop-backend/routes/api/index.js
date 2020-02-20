//构建路由
const express = require('express');
const router = express.Router(); //得到路由对象,这就是我们api的路由对象
//真正的数据库存储
const manufacturerController = require('../../controllers/manufacturer');

// product 1表    先做manu 2表 ，更加有利于业务的开展
// router.get('/manufacturers',(req,res)=>{
//     res.send('厂家'); //yarn start->http://localhost:3000/api/v1/manufacturers
// })
router.get('/manufacturers',manufacturerController.all) //控制器,进行分层，访问manufacturers是将他转移给control层去做
router.post('/manufacturers', manufacturerController.create)
// router.get('/product') //输出了对象就能在上面使用get set方法得到用户的访问

//输出这个对象
module.exports = router;

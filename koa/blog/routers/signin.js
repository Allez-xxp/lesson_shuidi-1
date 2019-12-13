const router=require('koa-router')();
const controller=require('../controller/c-signin');
// 显示登录页
router.get('/signin',controller.getSignin);//路有一定要有/
router.post('/signin',controller.postSignin);
module.exports=router;
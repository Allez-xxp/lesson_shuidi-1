//路由中间件
const Router = require('koa-router');
//实例化一个路由,负责文章模块
const router = new Router({
    prefix:'/posts' //koa的写法
});

const auth = require('../middlewares/auth.js')
// let isLogin = false;
// const auth = (ctx, next) => {
//     if(!isLogin) {
//         ctx.redirect('/login')
//     } else {
        
//         next();
//     }
// }

//get，看文章不用权限
router.get('/',async(ctx) => {
    ctx.body = '文章列表'
})
//新增文章要权限
//鉴权，单独交给一个中间件去做
//路由中间件前面加中间件，

router.post('/',auth,async(ctx) => {
    // ctx.body = '登录了吗？'
   
    // ctx.redirect('./login')
    ctx.body = '保存成功'
    
})

module.exports = router
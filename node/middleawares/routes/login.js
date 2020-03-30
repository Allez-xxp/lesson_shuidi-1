//路由中间件
const Router = require('koa-router');
//实例化一个路由,负责文章模块
const router = new Router({
  prefix: '/login' //koa的写法
});

router.get('/', async (ctx) => {
  ctx.body = '登录成功'
})

module.exports = router
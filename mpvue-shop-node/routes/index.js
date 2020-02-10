//在这里定义所有的接口
// 项目除了需要路由，还得要控制层，用来分别控制不同的功能需要用到的代码
// 完成路由的分发（分布式操作）
const router=require('koa-router')({
    // prefix就是给路由加路由前缀
    prefix:"/lm"
})
 //访问页面得知道端口路由
//在前端写了host，在后端引入koa-router的时候就要修改了
//const router=new Router()  这样我们就有路由可以用了,加了prefix就不用new了，直接使用我们引入进来的koa-router,不用new实例

// 我们在routes引用的controller其实就是controllers的index.js所以在家index
const controllers=require('../controllers/index') //只引入到controllers，然后修改router.get()
// 现在的引入过来的其实是个箭头函数，我们抛出去的就是一个mapDir(就是个箭头函数)拿到的是个对象(tree），对象当中可以拿到文件的绝对路径


// router.get('/index/index',(ctx,next)=>{  //get是koa路由自带的，假设我请求任何路径*（可以是别的路径，可自定义）
//     // ctx上下文环境，body是koa自己的方法
//     ctx.body='hello,world'
//     //从数据库获取数据返回给前端
// })  
router.get('/index/index',controllers.home.index) //此刻原来的箭头函数就被controller层替代了
// 为了将项目更加地模块化通常会将(ctx,next)那个箭头函数写成一个控制层（专门用来写具体要干嘛的）。去controller(建home->index,js)

//把router导入出去,app.js的router的引入才有用 看一眼代码有没有问题node app.js
module.exports = router
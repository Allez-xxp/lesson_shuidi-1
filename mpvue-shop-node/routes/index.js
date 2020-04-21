//在这里定义所有的接口
// 项目除了需要路由，还得要控制层，用来分别控制不同的功能需要用到的代码
// 完成路由的分发（分布式操作）
//原1
const router=require('koa-router')({
    // prefix就是给路由加路由前缀 因为要打理成跟前端的util的host里面的一样
    prefix:"/lm"
})
//原2
 //访问页面得知道端口路由
//在前端写了host，在后端引入koa-router的时候就要修改了
//const router=new Router()  这样我们就有路由可以用了,加了prefix就不用new实例了，直接使用我们引入进来的koa-router,不用new实例
//原3.1
// const controllers=require('../controllers/home/index') 
//但是如果说我们除了有home，控制器下还有很多别的，就要写很多个这样的引入
//这样写就不可取，我们在index写一个自动配置目录结构的方法出来，更有灵活性
// router.get('/index/index', controllers)
// 这样写是会有一个问题的，我们这里引入的controllers/hom/index抛出的箭头函数，也就是写在这里的router.get里的controllers

// 我们在routes引用的controller其实就是controllers的index.js所以再加index
const controllers=require('../controllers/index') //只引入到controllers，然后修改router.get()
// 现在的引入过来的其实是个箭头函数，我们抛出去的就是一个mapDir(就是个箭头函数)拿到的是个对象(tree），对象当中可以拿到文件的绝对路径

//原3
// router.get('/index/index',(ctx,next)=>{  //get是koa路由自带的，假设我请求任何路径*（可以是别的路径，可自定义）
//     // ctx上下文环境，body是koa自己的方法
//     ctx.body='hello,world'
//     //当用户请求/index/index的时候，我们这里就应该从数据库获取数据返回给前端
// })  
//首页相关的接口
router.get('/index/index',controllers.home.index) //此刻原来的箭头函数就被controller层替代了
// 为了将项目更加地模块化通常会将(ctx,next)那个箭头函数写成一个控制层（专门用来写具体要干嘛的）。去controller(建home->index,js)

//搜索相关的接口
//取热门搜索和历史纪录
router.get('/search/indexaction',controllers.search.index.indexAction)
//通过post做接口请求
// router.post('/search/addhistoryaction', (ctx,next)=>{ //请求的data
//     // ctx.request....请求到的参数
//     ctx.body={
//         // hello 往页面上面输出....
//     }
// })逻辑是这样的，但我们不这样写：我们利用我们建的控制层
//存搜索记录
router.post('/search/addhistoryaction',controllers.search.index.addHistoryAction) 
//addhistoryaction得去定义它，来到search/index
//当用户请求当前这个接口的时候就意味着用户输入的内容（search/index里面的openId,keyword)会被插入到后端数据库中去

//清除历史纪录的接口
router.post('/search/clearhistoryAction',controllers.search.index.clearHistoryAction)

// 搜索提示接口
router.get('/search/helperaction',controllers.search.index.helperAction)

//商品详情页
router.get('/goods/detailaction',controllers.goods.index.detailAction) //然后后面是回调函数，我们直接放controllers

//把router导入出去,app.js的router的引入才有用 看一眼代码有没有问题node app.js
module.exports = router
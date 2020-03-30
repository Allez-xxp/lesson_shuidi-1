//中间件是什么 middlewares koa express
// 服务是通过 middlewares 来提供的
// 洋葱图是什么，怎么结合路由守卫 
const Koa = require('koa');
const app = new Koa();
//请求中间件，拿到数据，提供表单的数据收集, koa-bodyParser是一个中间件服务 解析数据 将拿到的json或文件数据交给ctx 接收ctx的请求
const bodyParser = require('koa-bodyparser'); // 中间件服务 函数

//在三千端口启动服务，返回hello给用户
// 向用户响应hello，最简单的一个web服务
// koa的web服务，由app.use开始
//中间件就是一个函数,就是为后端开发 node提供服务的
//2.
// const sayHello = async (ctx) => { //一般声明为async ，就能用await
//     ctx.body = 'hello, world'; //响应体  //在3000端口可以看到效果
// }
//1. 
// const sayHelloCN = async (ctx) => { //访问时得到的应用上下文环境ctx
//     ctx.body = '你好，世界';
// }
// //是个函数就能用app.use来调用

// //中间件执行是有顺序的
// //处理koa有顺序的
// app.use(sayHelloCN)
// app.use(sayHello) //启用一个中间件服务，用app.use（类似Vue.use()）
//3.
//提出一个需求 任何一个请求进来（koa中叫ctx.req), 下面的中间件函数就会去提供服务

//3.3
//有专门的中间件
//Date.now()得到时间戳

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}` ) //es6的字符串模板
  next();
}

app.use(logger);
//怎么样即有log又不会只是404(页面没有数据)，加一个next 向下传递

//3.2
//要放上面，因为它的内部的代码可以await
//这是一个发送表单的处理 通过/ 进来， 为req服务的一定是中间件 处理表单
//还有处理用户登录的中间件
//还有处理数据库的中间件
//需要bodyParser用来收集用户post过来的数据  请求头 请求体 当数据全部到达的时候才调用next,执行后面的
//所以要注意写的位置
app.use(bodyParser());  // 内部的代码 await    next

//加一个中间件 加上一个服务
//logger设计日志服务,日志发生在一个用户进来的时候  Date req.url console.log

//3.1
// 面试题  4月底，  vue + node 考点 
// 加中间件， 加上一个服务
// logger  设计日志服务  req  Date()  req.url  req console.log
// 响应
app.use(async (ctx) => {  //ctx由app.use提供
  // context上下文(中间件的从上到下的传递过程) 提供什么服务
  // 得到表单传过来的数据
  // res 向发出请求的用户返回他在请求时form里的数据  去postman中看
  // postman中请求发送成功了 但是显示没有数据？？怎么做
  // bodyParser 因为表单的数据到达是异步的，（像node）有一个on('data)的过程，on('end')结束。而请求是一进来，
  //向用户的这次请求反馈ctx.body(响应体)，这里代表res 响应结果，ctx.request.body这个是请求
  ctx.body = ctx.request.body  // ctx.request req
})



app.listen(3000);
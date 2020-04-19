const Koa=require('koa') //此时我们还没有koa,所以要在项目中引入koa,安装一下koa这个依赖
const app=new Koa() //new koa的实例
const bodyParser = require('koa-bodyparser'); //为post请求服务
//剪切了路由
const config=require('./config') //从mysql来到这
// 把configs文件拿过来,现在不能跑3000端口了，要跑5757，而5757被定义在了配置文件中，所以要引入过来。

//解析请求体
app.use(bodyParser());


// const app=new Koa() //new koa的实例
// new了实例之后就要拿到router
//剪切了路由的实例化

//这里是定义接口的操作，一般专门放在一个文件(routers的index.js)，提高可读性
//剪切去了router的index.js 

//router.get相当于在定义接口为了使项目可读性更高，我们分开来写在项目中新建routes文件夹
// 项目除了需要路由，还得要控制层，用来分别控制不同的功能需要用到的代码
//现在需要去创建一个配置文件

const router=require('./routes') //光这么引入的还是不够的，去routes的index.js要export

// 启动路由：
app.use(router.routes()) //加了一个.routes()方法
app.listen(config.port,()=>{ //那么这里的端口也要改了,然后再启动一下app.js
    console.log(`server is started at port ${config.port}`)  //然后就是node app.js运行,在浏览器上输localhost:3000就能有hello world了
}) //监听一个端口


//基本后端web服务启动
// const Koa = require('koa');
// const app = new Koa();

// const Router = require('koa-router');
// const router = new Router();
// router.get('*',(ctx, next)=> {
//     ctx.body = '你好';
// })
// app.use(router.routes());
// app.listen('3000', ()=> {
//     console.log('端口启动了')
// })
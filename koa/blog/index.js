// 单点入口
const Koa = require('koa');
const config=require('./config/default.js');
const postRouter=require('./routers/posts.js');
const signinRouter=require('./routers/signin.js');
const app = new Koa();

const ejs=require('ejs');
const views=require('koa-views');//处理模板
const path=require('path');
// app.listen(3000);
//?use 应答模式 中间件是处理应用请求的核心
//启用路由中间件
// console.log('listening on port 3000');
app.listen(config.port);
// app.use(require('./routers/posts.js').routes());//启用路由,路由地址放在内部了

// 看header.ejs,footer.ejs,posts.ejs 
app.use(
    views(path.join(__dirname,'./views'),{
    extension:'ejs'
}
// __dirname返回当前项目的绝对路径
))
app.use(postRouter.routes());
app.use(signinRouter.routes());//专门登录的路由
console.log(`listening n port ${config.port}`);

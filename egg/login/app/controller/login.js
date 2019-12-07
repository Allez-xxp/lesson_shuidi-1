const Controller=require('egg').Controller;

class LoginController extends Controller{
   async register(){
    //异步 存一条数据
    // this 中解构出ctx （ctx请求访问的上下文环境）
    const {ctx }=this;
    const {password,username,email}=ctx.request.body;
    // service层，数据存储业务
    // ctx.body = 'hi,egg';
    await ctx.service.user.register({password,username,email});
    }
    async loginIn(){
    const {ctx}=this;
    // 要拿到用户名和密码 ctx =req+res
    // console.log(ctx.request.body);
    const {email,password}=ctx.request.body
    console.log(email,password);
    ctx.body='登录成功'
    }
}

module.exports=LoginController;
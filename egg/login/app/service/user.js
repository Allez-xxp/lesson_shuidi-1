const Service=require('egg').Service;
const crypto=require('crypto');
const uuid=require('uuid');
class UserService extends Service{
    async register(user){

        const {ctx}=this;
        console.log(user,'service');
        // 密码不能存明文 单向加密的sha256
        user.password=crypto.createHmac('sha256','hhl1111cn')
        .update(user.password)
        .digest('hex');
        // user.user_id=uuid.v4().replace(/-/g,'');
        const userInfo=await this.ctx.model.User.create(user);

        ctx.body={
            // user,
            
            msg:'注册成功',
            userInfo
            // user_id:user.user_id
        }
    }
}

// 本模块向外输出
module.exports=UserService;
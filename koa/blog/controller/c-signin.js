exports.getSignin=async (ctx)=>{
    // ctx.body='form'
    await ctx.render('signin',{

    })
    // 等待渲染前面有extension:'ejs'
}
exports.postSignin=async (ctx)=>{
    ctx.body={
        mes:'登录成功'
    }
}
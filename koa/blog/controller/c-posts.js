exports.getPosts=async ctx =>{
    //中间处理函数
    // ctx.body='hello,posts';
    // ctx是上下文环境 body响应体
    // ctx.body={
        // posts:[]
    // }

    await ctx.render('posts',{

    })
}
exports.getRedirectPosts = async ctx => {
    ctx.redirect('/posts');
  }
const router=require('koa-router')();//在这里定义路由,然后可以写get posts
const controller=require('../controller/c-posts');
router.get('/posts',controller.getPosts);
router.get('/', controller.getRedirectPosts);
module.exports=router;//每个文件都要向外输出一下
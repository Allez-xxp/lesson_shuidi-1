- Koa 是最流行的node 轻量级框架
  egg.js 基于koa的二次开发
- Koa new ->app->listen
  /bin/www(无后缀)，www是网站项目的启动文件
  http.createServer(app.callback())创造一个服务器
- 模板
  网站开发的views
  koa-views()
  app.use()启用views中间件
  模板在哪?使用哪种模板引擎？
  koa-views中指定，引擎->pug
- 设置路由,路由要分层
  routes/index.js
  koa-routes()才能做：
  .get post
  index.routes()->
  app.use()
- logger 访问记录
  

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
  有koa-routes()才能做：
  .get post
  index.routes()->
  app.use()
- logger 访问记录
  koa-logger安装并use
- 出错模块
- https://img.bosszhipin.com/beijin/mcs/banner/20171031/84ade9701fd02a77fedb6675600a134f33d208e8d6fc287973c46e5cb5346f06.png?x-oss-process=image/resize,w_100,limit_0
  https://www.zhipin.com/job_detail/1c491d20c1ddd7f50nZ409y6GFY~.html?ka=comp_joblist_5
  静态资源，服务器端资源
  IP ?
  静态资源：img.bosszhipin.com 静态资源专门放在public文件夹中
  怎么找IP？：
  dns解析-》网络供应商（提供动态IP地址）-》有dns解析列表
  公司会在网络供应商机房里装一些cdn机器 若本地没有则会去中央服务器里请求一次-》缓存到本地（机房里）
- koa-static
- 表单提交
  koa-bodyparser
  - GET 数据都在请求头里 head url 方式:get
    url?a=1&b=2
  - POST head（含url）
    body.length  +body(请求体)

## node的发布
   docker 容器化
   node 项目写完后，测试工程师（环境？）
   让项目在不同的机器里，享用相同的环境，跑起来 只要装一个docker

中间件 
node中访问post  posts{{title, body}} 增加 get 检索

resful 的概念 新增文章

发表文章之前 要有一个用户登录的身份 
未登录时 直接访问 如果要/posts发文章，要送到 -》 login 里先，怎么做？
1. 路由守卫 由vue-router中的beforeEach 跳转之前的判断 前端方式 
前端是单页应用，有自己的路由系统

2. 后端方式
axios,http拦截 拦截所有的请求 /post /admin  /api  是属于axios的配置 前后端分离 接口访问的  koa express http请求头
当用户使用post发送时，如果没有权限，可以给他响应一个请求头
中间价axios catch
发送一个http请求头-> 304-> /login
怎么跳？
koa: cyx.redirect('/login') //发送的304

node的框架，都是以中间件（也就是函数的形式）来构建web(从请求到结束的)服务，为用户访问提供服务
所以 node开发的核心就是在开发中间件

中间件middlewares是有好多个的
它有访问顺序的 像洋葱一样 一圈一圈 
可以提前退出
中间件是为用户提供web服务的
koa中只有一个ctx ：由req res 构成

每个用户进来访问，当前是 http://localhost:3000/
用中间件去服务，是node中的核心
为什每一个用户的访问就是一个req, 当用户结束访问的时候我们用res响应用户的请求内容
在req和res之间其实可以有很多很多层，去提供中间的 状态的服务，由中间价去打理

- 中间件的洋葱模型
一层一层往下走 (除非碰到ctx.body 或者express中的res.json)
没有碰到解决方案的时候会回流
每一个next其实就是往执行栈中插入一条数据 交给下一个中间件
使用栈这种数据结构，不是简单的数组
进来就next，执行一个就入一个栈，走到最后没有找到退出，就执行栈的退出，出栈

- app.js ; routes 跟应用结合起来

- 中间件你是怎么用的， 觉得对他深入理解了
  比如我在发文章前， check 登录， 不用写道
  posts/ 中间件中， 而独立的放到 auth 健全中间
  件函数中， 单独编写， 分离到middlewares 目录
  node 架构中从此多了一个middlewares 层


    
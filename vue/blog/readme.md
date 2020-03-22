# 全栈开发的入门练习
做一个blog
1. server(后端) 项目目录下新建一个server文件夹
为blog提供/api,对文章article进行增删改查。。。。后端服务
后端服务，写接口，以api为主
2. vue(前端)因为有更好的用户体验。单页应用开发。
路由 VueRouter
/about /home /*支持页面热更新（就是页面头部底部不动，只有中间关键地方变动）
随着<router-view>和routes数组的配置来更新。页面不用每次都刷新，用户体验更好。

- 做server后端，用node+mongodb 之后还有Go

在blog目录下vue create

1. 全栈开发的思路搭建起来
前后端分离的全栈开发 (/api) vue
还需要一个admin后台开发构建网站底层结构，server是提供后端业务逻辑的封装，前端做用户体验。
打开server终端，初始化一下，完成以下目录结构搭建，npm init -y
server/routes里面放路由；models模型层；db把数据库分离到这里
发起了数据库连接后，使用数据库use myblog;mongodb/bin,先双击mongod.exe,再双击mongo.exe

在server下添加index.js,在里面完成数据库的连接。
require了express,就要yarn add express
然后使用nodemon index.js
can't find mongoose时也要yarn add mongoose;

然后去model模型层添加数据
model/Article.js; model/Category.js; model/User.js
bcrypt，引入 yarn add bcrypt
https://www.npmjs.com/package/bcrypt

//一个用户有多篇文章，那么用户和文章的关系怎么表达？ 在Article.js uid:{}

来到前端web/src/router/index.js，添加页面链接 打开终端 npm run serve
关于路由的可以看yiqing

关于
const router = new VueRouter({
  mode: 'history',//配置对象,路由的模式
- vue-router有两种模式
1. history 是js里面内置的对象，/
浏览器历史对象history.go(-1)->后退 h5里面才提供的功能，属于新的api,所以有一些历史问题，手机上没问题，都支持，电脑端要注意它的兼容性。
2. hash 以#开始的就是hash格式 兼容性更好，ie8,ie9都支持这种格式的路径，叫做哈希苗连接
这个是配置在router/index.js

在App.vue加上router-link

- 先把完整的路由想一想，在/views目录下，把组件建好（会有几个跳转）
- 组件 component 会用到哪些？
head.vue foot.vue......(一个页面需要用到的组件)
element-ui
router + views + component 分工合作，各司其职

现在把他们打包一下npm run build 出来了一个dist目录，文件都在这里
我们把打包好的dist放置到服务器下，就是srever目录下，重命名为web,这个不是我们的vue项目，是我们打包好了的项目，有我们vue项目依赖的静态模板index.html文件（有app结点）；有js文件;有打包好了的css文件...

来到后端index.js，项目上线一定是以后端的形式上线的 node php java

# 部署上线
1. vue 写完后 通过build生成一包静态文件，以html为入口文件index.html,再加上app.js,就能通过veu的MVVM响应，
2. 把静态文件包放到服务器目录下（这里是server),这个目录就是会放到阿里云服务器上的，会部署一个node环境，就能把静态前端页面渲染，就能浏览这个网站
3. 把vue网站发布？

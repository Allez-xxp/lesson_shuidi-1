- node的模块化与前端的统一，node模块化的es6化 
打开终端npm init -y 初始化一下
yarn add express
app.js

-将
1. babel工具js编辑器，将最新版本的js->当前环境可以执行的js
写的时候用最新的语法，执行的时候也能执行
但用起来有点麻烦
2. 转译
要安装一堆东西
"@babel/cli": "^7.8.4", 编译命令行
"@babel/core": "^7.8.6", 变异核心代码
"@babel/preset-env": "^7.8.6",按环境预处理
"@babel/register": "^7.8.6",注册es6-》common.js的代码的转变功能

- 三个项目
上线。服务器是怎么一个方式？
build->dist->express,static

ele打包 dist/ web/
ele-admin dist/ admin/
一定是在node项目中 api
express static

后台用yarn build打包ele-admin
将dist复制到ele-node,在重命名为admin
ele也build也放进去，改成web
web将作为项目的/
admin 后台 /admin
api是服务，是没有页面的
localhost:3000 才是所有人编辑 统一的入口 web中的 不用改index.html路径
localhost:3000/admin 后台应用 需要index.html改相对路径./不然会找不到
localhost:3000/admin/login 用的post
来node的index.js
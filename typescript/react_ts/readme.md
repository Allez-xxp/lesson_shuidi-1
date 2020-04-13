# react ts
讲typescript的目的
阿里
1. react比较多 react + ts 必问
"scripts": {
    "start": "webpack-dev-server", 
    "build": "webpack"
webpack 负责编译
webpack-dev-server //是start 开发阶段使用，会由webpack去编译 同时，启动live-server http服务
nginx docker 
webpack-dev-server --mode development --inline --hot(局部热更新) --open(自动打开浏览器)
 刷新浏览器--inline
 重新加载改变的部分--hot
yarn add webapck webapck-cli webpack-dev-server

会去根目录上找webpack.config.js
yarn add bootstrap
options: {
        name: 'assets/img/[name].[ext]?[hash]',  //hash是什么？ 文件指纹
    },

"presets": [
        [
            "env", //根据env进行相应的转译
            {
                "modules": false //这是干什么的？
            }
        ]
    ]
yarn add @babel/cli 命令行的转译 @babel/core编译 @babel/preset-env babel-loader
yarn add awesome-typescript-loader typescript
yarn add html-webpack-plugin
yarn start运行打包
css-loader
如果有版本的问题
yarn add babel-preset-env

--hot
热更新：
不要全部都刷新，不会因为改一个字就刷新一次 热更新的好处，可以让我们的页面做到局部更新
可以不用丢失组件状态 比较高效率 特别适合mvvm
mvvm的热更新
js热更新 html不会
比如我们的mounted data 是有一个更新状态的
yarn build编译一下

src="app.sdgsfgsfdfdg" 
版本管理；

output: {
   path: path.join(basePath, 'dist'),
   filename: '[name].[hash].js', //一定是app  hash值唯一地标志打包的hash
 },
 hash是什么？
 文件版本 app.fafaffad.js demo.
 fafafaff1212.[hash].css
 每次都生成独一无二的文件
 静态文件会缓存再留在浏览器中，如果文件修改了，app.js old new 文件名没有变 用户不知道变了
 要生成一个版本号 业务代码要强制改个名 比如app.js-》app.asgsag是全新的版本 本地就会重新缓存 新改的的文件就会重新上线
 如果加的是.js?3 old new 这就是小的改动

 yarn add css-loader
 yarn add mini-css-extract-plugin
yarn build之后多了关于css的文件
 css:
    Entrypoint mini-css-extract-plugin = *
       2 modules //一个是bootstrap的代码
Done in 6.50s.

我们的css框架是不会变的，但是js 业务代码会变 所以两种文件分开打包 vendorStyle不需要总是更新的
所以我们要给webpack多个打包的入口
多入口的作用：
1. 入口 entry 从某个文件 require import =>webpack的 __require__
webpack是个大函数，会沿着入口一直往里走组织起来一个依赖关系 决定加载顺序 比如公共先加载 
但是业务是要经常变的，所以有hash的需要：通知客户端更新，
把几个月，甚至永远不更新的文件作为独立的入口，再理一个依赖关系 然后加载。
有时候会问：
entry 可以有多个打包入口吗？为什么？
用户那里的更新可以最小化，我们使用的第三方库，不用每次都打包一遍，影响打包速度
比如：vendor库 vue.js vuex vue-router 
这样可以提升我们的编译速度，同时保障及改善了用户的浏览体验，同时改善缓存

react将dom分离出来了
yarn add react react-dom 把 组件跟页面挂载dom化专门分离出来了一个react-dom库
再加一个hello.tsx 要挂载到root上 要是个组件
ts中使用react还要装一个类型声明文件
yarn add @types/react @types/react-dom
ERROR in ./hello.tsx 7:8
Module parse failed: Unexpected token (7:8)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|     //react支持声明式的模板jsx vue没有的
|     return (  //jsx js in xml 声明式的模板引擎语法 react vue的区别 vue用template
>         <h2>
|             Hello 你好！
|         </h2>
 @ ./index.ts 5:14-32
证明文件进入到了依赖关系中了，同时在webpack.congfig.js中在extensions中加入了tsx
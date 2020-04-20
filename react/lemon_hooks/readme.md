 react + ts + hooks(React的新特性)
 react + redux + react-router react hooks 带来了很大的改变
 # webpack继续
 tsconfig.json:
 {
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "jsx": "react", //可以让tsx工作的主要原因 webpack启动的时候回去找jsx->ts->react对JSX的编译
    "sourceMap": true, //找到原文件的代码位置
    "noLib": false,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": false,
  "exclude": ["node_modules"]
}
理解ts配置文件
https://segmentfault.com/a/1190000013514680

webpack.config.js
https://www.npmjs.com/package/awesome-typescript-loader
1. sourcemap
2. --inline到底是什么
3. 什么叫polyfill
4. css的处理高级功能
5. react中的新特性带来的fragment <></>
(语言精粹里面看到过)
没有全局安装webpack
    --save-dev是只有开发阶段的时候用的 开发完就不用了 我们没有全局安装
npm i webpack webpack-cli --save-dev
    - 因为webpack4版本，必须跟webpack-cli结合使用，否则webpack不能正常打包
    webpack v4开始，webpack不再需要配置文件，但是开发人员通常希望根据其用例和需求创建更自定义的webpack配置。webpack CLI通过提供一组工具来改善自定义webpack配置的设置，从而满足了这些需求。
    https://www.npmjs.com/package/webpack-cli
    - package.json，这个就是配置文件，为啥webpack构建的项目是可配置的，就是靠它
npm i webpack-dev-server --save-dev
    只有在开发阶段，才会借用这个，启动web服务打开浏览器，自动刷新，等到build完了之后
    react/vue 开发（其实就是一个静态资源开发） ，最后都是一个dist目录,这个目录会交给后端，或自己docker化(自己能做运维) 用nginx 服务代理
    就跟live-server一样。这个在上线之后就不需要了

npm i css-loader style-loader file-loader  url-loader（远程资源的加载）  html-webpack-plugin  awesome-typescript-loader mini-css-extract-plugin --save-dev
    作用在css上的，有先后顺序
    1. The css-loader interprets(解释) @import and url() like import/require() and will resolve them.
    2. style-loader：Adds CSS to the DOM by injecting a <style> tag
    3. file-loader非base64得文件得用这个拿文件
    4. html: HtmlWebpackPlugin  
    链接：https://www.jianshu.com/p/08a60756ffda
    他主要有两个作用
    为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
    可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
    github上有些关于htmlwebpackplugin的属性介绍
    5. tygen — TypeScript documentation generator. TypeScript文档生成器。
    awesom-typescript-loader是用来编译tsconfig.json的
    6. 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
typescript开发的时候编译 运行的时候还是用的js所以也是--save-dev
npm i typescript --save-dev
    1. typescript使得js在书写的过程中有了参数类型的限制在 传参的过程中变得严格，减少了不必要的错误的发生
使用babel最新版本:
npm i @babel/cli @babel/core @babel/preset-env @babel/polyfill
https://www.jianshu.com/p/cbd48919a0cc
    1. @babel/cli: Babel带有内置CLI，可用于从命令行编译文件。
    2. 如果某些代码需要调用 Babel 的 API 进行转码，就要使用@babel/core模块
    babel的目的就是为了解决浏览器的自身对于es语言的差异性而带来的一款工具,这里要注意一下这个@这个符号，这个是只有babel7才特有的，babel6都木有,@babel/cli是依赖一个叫@babel/core的包文件的，没有这个包文件是绝对不能执行任何编译操作的
    3. @babel/preset-env插件包
    4.@babel/preset-env是一个智能预设，可让您使用最新的JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器polyfill）。这既使您的生活更轻松，又使JavaScript包更小！

babel负责js，webpack负责整个的工作流

## js的责任
由babel负责 polyfill是什么？
- babel-profill中的代码：
https://cdn.bootcss.com/js-polyfills/0.1.42/polyfill.js

- 是es6中提供的一种新方法
es5中只有顺序执行或者回调函数，没有Promise这种可以把异步变成同步的处理。
Polyfill是一个js库，主要抚平不同浏览器之间对js实现的差异。比如，html5的storage(session,local), 不同浏览器，不同版本，有些支持，有些不支持。Polyfill（Polyfill有很多，在GitHub上https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills），帮你把这些差异化抹平，不支持的变得支持了（典型做法是在IE浏览器中增加 window.XMLHttpRequest ，内部实现使用 ActiveXObject。）

提到Polyfill，不得不提shim,polyfill 是 shim的一种。
shim是将不同 api封装成一种，比如 jQuery的 $.ajax 封装了 XMLHttpRequest和 IE用ActiveXObject方式创建xhr对象。它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现。

文章链接：https://www.jianshu.com/p/7562b8b589f3

## polyfill 打补丁
- fill是填充
poly是聚合
es6是怎么在低端浏览器可以被支持的呢？
由两部分的功劳：
1. babel-preset-env + babel-core 降级处理
const->let var   ()=>{} function() { }
2. polyfill 会把一些无法降级的比如Promise还有数组的map reduce方法手工实现一下
es5中只有顺序执行或者回调函数，没有Promise这种可以把异步变成同步的处理。
polyfill就叫垫片，没有的补全,就像手动的添加了script src = polyfinn.js
浏览器从不具备这个功能，到拥有了

if (typeof Object.create !== "function" ) { }
在实现polyfill 做判断，不是要给所有的浏览器都做同样的补丁的，因为不同的缺的是不一样的
打补丁之前，判断浏览器是否拥有此功能？
polyfill.js最后要打包到bundle.js中  根据不同的preset(预处理)打包不同的target

配置.babelrc
webpack.config.js 
index.tsx

- 
npm i optimize-css-assets-webpack-plugin --save-dev
主要是用来压缩css文件

3. babel的plugin polyfill也无法解决的时候用这个
插件。
## inline和hot的区别
"start": "webpack-dev-server --mode development --inline --hot --open", //是递进的关系
都是改变后刷新内容，但是有区别
inline是强制刷新，有弊端-》MVVM的状态会丢失掉
hot 是针对(hmr) hot module reload 热更新 局部更新 部分组件的修改
如果是hmr有更新，就根据hot去更新hmr
如果不是hmr 非状态部分，就是用inline强制刷新，越在后面的越高级别，也就是先--hot，
至少支持inline  递进的
--open强制打开浏览器

- index.tsx

什么是状态？
比如vue中data从一个值变成另一个值
## css处理
1. 如何从style->变成.css文件的方式输出  就是以link src的方式处理
use: [MiniCssExtractPlugin.loader,"css-loader"]
// use: [MiniCssExtractPlugin.loader,"css-loader"]  //loader进css-loader的方案，然后换一种方案-》minicss 在plugin中定义
// 1.样式从js文件中单独抽离出来 不抽也能执行，因为css最为style的text看可以完全的在js中寄生，但是编译的时候我们还是希望抽出来，为下一步能压缩和css能单独的编译进行调试做准备

yarn start编译一下
单独打包：yarn build
2. 编译的时候，css要压缩
new OptimizeCssAssetsPlugin()
对css的优化
3. 如何调试p标签的bug
## sourceMap
回到不单独打包的情况，style的时候。
能看到p标签是有问题的：

```css
body{
    background: pink;
}
p{
    color: xxx; /*这里p标签的状态有问题,不是一个合理的值*/
}
```
 {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../',
        hmr: process.env.NODE_ENV === 'development',
        reloadAll: true
    }
 }
style-loader开发的时候
定位p color错误 style代码很多，忘了在哪里的时候
webpack帮我们定位一下错误，点一下就能到错误所在行
sourcemap
devtool: "source-map", //源码映射，有助于调试的 .styl .ts文件 开始写的代码和最后的是不一样的，在调试的时候需要找源码，  



## react
yarn add react react-dom
yarn add @types/react @types/react-dom --save-dev //对类型进行检测

webpack.config.js文件改了之后要重新启动。

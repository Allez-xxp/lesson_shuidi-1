# webpack打包一切静态资源，由loader负责
1. 打包css style 图片 字体 postcss
深入细节 手写webpack的loader 难点 版本问题 不兼容问题等 难调
- 初始化一下
yarn add webpack webpack-cli webpack-dev-server
- package.json script
- 入口核心文件.js文件最后打包后 要为页面服务的 js文件放在底部加载
## webpack 为web应用工作
启动后 没有dist目录 但是html中有dist.js 可以单独的打开
development阶段，webpack是把工作放在内存中，写下代码就会编译(申请了很大的内存的，编译完成后才打包)
webpack experss或别的启动live-server
dist.js其实是experss->static_server
1. css-loader style-loader 的区别
style-loader只负责语法打包
js里面引入css

看main.css和main.js怎么融合的

webpack 打包的过程时建立依赖关系的过程
import require  path extension
ext=>loader对应的
package.json 分析 报错
2. use带来了定制性
webpack不是用来学的 是用来用的 是用来修的
webpack考点多半出在你是否会修它
如何在js中处理css?
指导思想：
webpack为web应用而来
css怎么用的？一种是style：行内样式<style></style>；一种是css文件，是引入的用法link/import <link>
识别到了css文件，webpack 应从哪个方向loader这个资源？
loader完了之后要让它继续往后走
css-loader为css后缀解析，以及css内的@import 以及外部资源工作
style-loader会将我们的样式插入到dom中，为应用服务

图片有web应用的需要，webpack为之奋斗

webpack打包的时候会将图片变成base-64进行图片的性能优化（很长的url)
什么时候需要压缩成base64呢？
再加一个
"build": "webpack --mode=production"
base64减少了请求的数量
不用再重新打开一个进程 加载图片 减少url请求
但是会让js文件体积暴增-》一个文件就下载很慢
所以这里就有一个上限

再加一个file-loader?
因为没转成base ,在上限以外的会生成了一个图片文件后，但不知道怎么处理
不是加了test吗？
不是以base64方式引入那个文件,现在虽然能处理这个css文件，但是要去相对目录中，或者说outputPath要生成这个图片到那个目录下，那就需要用file-loader把它作为文件引入进来
打包了之后 这个图片的url是可以访问的,因为：
webapack内置了express，它会把public目录下的所有都编译

- yarn build打包一下
发现css不见了(<style></style>)？
css文件是可以转成字符串，作为js中有个叫csstasks的这个属性，可以与js共融。t.push()

加yarn add mini-css-extract-plugin
再加个cross-env

minicss放进去有错
1.entry中多增加一个入口
2.
MinicssExtractPlugin放在style-loader"和css-loader之间？
为啥呢?
loader生效是有一定顺序的，
还是要指定路径
options: {               publicPath: '../'             }, 
为什么是有顺序的？
stark overflow

在引入一个styl文件
它就从style->再由那三个loader-》css
yarn add stylus-loader
loader: 'stylus-loader', //使用的时候会优先使用webpack来解析路径
options: {
    preferPathResolver: "webpack"
}
stylus-loader当前更喜欢使用手写笔的重新整理工具来解析路径，然后在找不到文件时退回到webpack。使用preferPathResolver带有该值的选项'webpack'来交换它。这具有使用webpack的异步解析而不是手写笔的同步解析的好处。如果触控笔文件中有很多依赖项，则可以并行找到这些依赖项。

yarn add postcss postcss-loader autoprefixer(是独立的一个包，专门解决css根据环境去添加前缀的)
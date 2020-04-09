## 前端工作流 front workflow
webpack是这个工作流中的管理者
- webpack 配置 坤文章，
    分为6个知识点
    二线面试需求
- webpack 又学架构 编译原理是个立即函数
webpack的编译架构 
webpack-build：
npm init -y
yarn add cross-env
1. 架构源头 从package.json
script:
webpack怎么不直接出场？用架构来解决 dev build目录的工作
cross-env 服务器无差别环境变量配置 node的npm用哪些包
两个环境并行 同时考虑工作流架构
定义脚本目录 不直接写webpack 在项目中添加则两个目录
将编译工作（前端工作流）通过目录的方式 build目录确定为开发架构的一项
build/dev.js 开发时的代码 build/build:prodution上线代码
2. webpack的重要性
代码要维护的 跟养孩子一样 每天要运营项目
改了一点点，webpack build
console.log(process.cwd(), __dirname);
<!-- D:\LESSION_SHUIDI\webpack\fe-workflow\webpack-build D:\LESSION_SHUIDI\webpack\fe-workflow\webpack-build\build -->
process.cwd()一直指向当前项目的根目录
3. base.js 在架构中的意义：可以同时服侍dev.js build.js两个文件
其实就是模块化
整理编译交给build
base把我们的基础配置做好，然后向外输出就行 负责用webpack-chain将工作连起来 不做编译
- babel
yarn add @babel/cli //@开始的说明是新版本
 @babel/core @babel/preset-env babel-loader -D
有了之后在base中加上
webpack中的modules配置 js文件  不同文件放在不同的loader 根据不同模块分类
新建config目录
4. webpack除了最基本的流程外 其他的module模块化及插件处理呢？ 文件模块分离
放在config.js中
babelLoader.js  //js文件的处理 
style.js //css文件的处理
HtmlWebpackPlugin.js
MissCssExtractPlugin.js
接下来引入模块 build.js中
配置文件base.js
lib工具目录 递归查找配置文件，挂在config（也就是webpack-chain)下
5. lib中把webpack的module放在config目录下 分不同的目录，使一个文件一件事
需要lib提供findSync方法，把所有的js文件组成一个数组输出出来，挂载到config中
文件的api
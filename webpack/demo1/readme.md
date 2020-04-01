- es6 node babel loader
- webpack 代表着当下前端生产工艺
如何用node写出一个webpack

1. src目录 -- 开发目录
入口文件 main.js router什么的都在里面
webpack 是一个bundle 把本多个文件打包在一起

// 为什么css文件是空的时候 输出的是：“{}”呢？
属性选择器：
document.querySelector('')



//并不是水火不相容的 css其实就是一些属性结点 css文本
// dom node结点 dom树上再使用css { width...} 添加到节点上
//css in js
//图片也可以 以二进制的形式引入
- js 与其他类型的文件不是水火不容的 可以用webpack
    - 文本
css文件 硬放进js是不行的 会报错
- 利用webpack 让js理解css
npm init -y
yarn add webpack -D  //-D编译阶段 Devdependence
yarn add webpack-cli//命令行工具
目前最新的是webpack 4 要针对相对的版本 装相应的配置工具
webpack会用到哪些依赖呢？ （不是webpack依赖他们）
yarn add cross-env  //依赖的一个包 跨环境设置的一个包

package.json:
"scripts": {
    <!-- 环境变量 cross-env可以跨系统设置环境变量 能屏蔽差异性;然后在执行webpack-->
    "dev": "cross-env NODE_ENV=development webpack",  //开发的时候用，希望入口从src/main.js往下流 
    "build": "" //开发完成，打包的时候 会压缩代码 性能优化什么的
    mac上运行环境

    "dev": "webpack --mode=development", //还有这种方式
     npm run dev
- webpack登场
webpack是专门做静态资源打包的
前端 css js style png gif都是静态文件
通过webpack打包成能理解的静态资源文件，都是静态文件为什么还要再打包一次？会整合一下 火锅-》巧克力豆
还要再加一个 webpack.config.js文件

//processnode中的进程全局变量 .env 环境变量
console.log(process.env.NODE_ENV)  //打印一下环境变量
npm run dev:
输出：
> demo1@1.0.0 dev D:\LESSION_SHUIDI\webpack\demo1
> cross-env NODE_ENV=development webpack

development

npm run build
- 开发时 vue-cli webpack 在内从中编译
- 上线时，在

cross-env 设置一个环境变量
1. cross-env NODE_ENV = development  或production
可以屏蔽window linux...
根据不同环境做出不同响应
webpack.config.js最基本三个：
最小执行单元：entry mode output
module.exports = { 
    entry: './src/main',  //入口 一定要有的 入口有个index.css 处理不了，从流水线先拿到别的地方处理，处理完了之后再放回来
    mode: process.env.NODE_ENV,0  //运行的环境，一定要有，以什么样的模式(是动态的) webpack的编译方式  我们先目前提供了两个develpoment production
    output: {  //打包，向外输出结果文件
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') 
    }
}
npm run dev3
单单只是js文件的时候 可以直接编译
- npm run dev
- node .\dist\bundle.js
    100
- npm run build
用这个打包的文件是跟dev编译的是不一样的
"dev": "cross-env NODE_ENV=development webpack", 
"build":"cross-env NODE_ENV=production webpack"

const rimraf = require('rimraf');
是打包中需要的一个npm包，用来删除目录的 在编译之前，先删除已有的dist目录
- 要载入一个css文件
yarn add css-loader
webpack就是一个流水线，工厂流水线
工人 ，把不能处理的文件比如css  styl .vue
把他loader 拖到一个能处理的地方 去处理
.vue  js  component
const css = require('css-loader!./index.css');  //！将css文件和loader文件分离
再npm run dev打包一次 loader用上了
- loader概念 css-loader!

webpack是一个boundle
会把main.js作为入口 一路经过
vuex,store,router,App.vue
...vue element-ui css boundle.js就是一个大函数 webpack会将将函数作为模块加载进去，作为立即执行函数传的参数
函数有优势，第一行 执行到最后一行
webpack 形参每个模块 作为对象输入

- css 通过
const css = require('css-loader!./index.css');  //！将css文件和loader文件分离
css可以in js
静态资源通过字符串来达到认同
- bundle.js webpack 打包生成的代码
是个立即执行函数
将入口分析出来的依赖，做成一个json（形参）传给bundle 函数去执行
- main.js它依赖于 index.css,先处理掉依赖的文件  index.css依赖于css-loader!
- 然后再处理本身的js 依赖的文件名作为key, 内容作为value，然后放进打包的bundle.js大函数中
webpack是一个大型工程，首先要解决的就是模块间的依赖
main.js 看成模块a
index.css b模块
index  import base.css c 模块
虽然entry 入口时main.js
但是实际执行顺序是 c->b->a
文件依赖关系组成一个json object
__webpack_require__类似commonjs中的require，是require的升级版

yarn add webpack-chain
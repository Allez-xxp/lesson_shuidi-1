在线教育
 - 腾讯教育
 - 头条教育
 - 猿辅导
 - 作业帮
 - 好未来

游戏
2d 3d three.js
 - 头条的游戏部门
 - 网易游戏
电商 
 - 海尔 1000粉丝？
 - 阿里 生鲜：河马先生？ 直播电商
 - 京东 taro小程序开发 react/vue
 - 拼多多+国美电器

 技术流
 云开发
    DaoCloud 上海的 12k毕业后
    七牛云
    青云
    阿里云
    腾讯云
    华为 web工程师 比亚迪/oppo 工作经验

杭州 一二线 个推 丁香园....

为什么秋招难，要看工作经验 因为春招快开始了

union app 所有的东西用vue可以生成网页，小程序，app

面试题 
mpvue 
taro 
商业项目 很重要
react antd
vue的element-ui

商业项目 本地项目 QQ群 

1. three.js webgl 3D渲染 canvas 3d
在canvas中引入一个形状，材质 就像一个camera screen 镜头一直调整

react + three.js组件化开发可视化应用
头条游戏部门 阿里电商部门 滴滴地图部门(3d地图)web

2. 写高质量代码，由eslint驱动
.eslintrc  .babelrc

yarn add webpack-cli webpack-dev-server webpack -D
yarn add babel-loader @babel/cli @babel/core @babel/preset-env
yarn add eslint-loader eslint -D

3. react 的jsx语法 在之前是怎么解析的
.jsx是=》.tsx=>webpack.config.js=>awsome-typescript-loader=>tsconfig.json jsx=>react
typescript

怎么解析jsx?
babel 因为babel由preset和plugin两大功能
yarn add @babel/preset-react -D
yarn add html-webpack-plugin
yarn add eslint-plugin-react -D
yarn add babel-eslint -D
yarn add eslint-plugin-html -D

4. 对好代码是如何定义，考虑的？
 1. 代码风格要ok，平时写代码使用eslint
  "no-console": "warn",//不能有调试的代码
  把代码拉下来 看看自己的编辑器，跟项目代码的eslintrc文件的一致
  风格管理工具支持单引号quotes
   "quotes": ["warn", "single"], 要单引号 不然会报错
  每个文件要有一个最后的换行:
  是有一个传统，文件最后换行，c c++开始就有可以清晰的隔开文件，打包的时候以分号隔开文件，
  semi:"warn" 每句代码最后要有分号
  semi:"off"是忽略
  还有一种万能方法，就是在报错的JS文件中第一行写上
  /* eslint-disable */
  良好的编程风格是优秀的代码的开始，是团队协作的开始
  js的语法不严格，用eslint来规范
  对于团队来说，编程风格是第一位的
  vue/react新版本，建议大家js末尾不用分号
  因为打包的时候系统会去加一个分号
  但是以前，分号是必须的 eslint-recomment airbnb facebook
  项目的时候使用arbnb编程
  eslint关于代码风格的增长
 2. 好的代码是要修炼的
  常用的数据风格 
  常用的算法
  常见的设计模式 面向接口进行编程
 3. 引入typescript，因为它有类型检测
yarn add react react-dom
ReactDOM.render(
    <div></div>,
    document.getElementById('game')
)
这个是由loader: ["babel-loader", "eslint-loader"], //加载到eslint模块下，规范js代码
解决的。
client.js 的render有什么奇怪？
React没有用到，为什么没有报错？
"plugin:react/recommended"//react的插件 //react编程

"react/jsx-uses-react": "error",
"react/jsx-uses-vars": "error",//注释一下//react编程不要对他报错//变量声明不报错

yarn add three
yarn add react-three-renderer
这个组件目前还在@3.2.4版本，还不支持react的最新版本，
对于react@15.6.1支持，react-dom@15.6.1支持，three@0.86.0支持，所以要改一下依赖


装饰器
yarn add autobind-decorator --save-dev

react中关于this bind
// 1. 用箭头函数 有性能损耗,箭头函数会重复声明，构造里不会
// 2. 用bind
// 3. 构造函数声明时bind
// 4. 装饰器 autobind
- bind
- constructor this... = this...bind(this)
- () => 性能要求
- autobind ->.babelrc plugin jsconfig.json
decoration是ES8的，是个实验型属性
在tsconfig中可以用,jsconfig中可以中，在这里面配置了，就能求掉警告
typescript中这个decorator其实是他内建支持的一个模式，
import autobind from 'autobind-decorator' //是一个库安装一下
向函数内部注入了aotubind功能
怎么让项目支持装饰器？
.babelrc:
```js
"plugins": [
        [
            "@babel/plugin-proposal-decorators",{ //装一下这个插件 yarn add ... -D
                "legacy": true
            }
        ]
    ]
```
然后去掉红线：
在tsconfig中可以用,jsconfig中可以中，在这里面配置了，就能求掉警告
{
    "compilerOptions": {
      "experimentalDecorators": true //为ES装饰器启用实验性支持。
    }
}
https://www.typescriptlang.org/docs/handbook/compiler-options.html
[1]这些选项是实验性的。
[2]这些选项仅在中被允许tsconfig.json，而不能通过命令行开关使用。
  

SyntaxError: D:\LESSION_SHUIDI\react\react-three\src\components\Game.js: Support for the experimental syntax 'classProperties' isn't currently enabled (10:22):
也是一个实验语法，叫classProperties
es7新特性
- es6有了class关键字 还是基于原型的，class只是语法糖
class又有新的特性支持了classProperties，es7新增的，
可以在一个class最外面直接声明一个这样的属性
static propTypes = {
        width: PropTypes.number.isRequired, //传了的
        height: PropTypes.number.isRequired,
        // dfd: PropTypes.number.isRequired,
    }
.babelrc
yarn add @babel/plugin-proposal-class-properties

1:1   error  React.PropTypes is deprecated since React 15.5.0, use the npm module prop-types instead  react/no-deprecated
yarn add prop-types
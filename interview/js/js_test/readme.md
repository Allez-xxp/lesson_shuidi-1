测试的框架 断言库两种 库有很多
jest、 mocha
要给项目做测试，
ant-design 就是jest
Element是用的是karma
jest比较简单 这个框架
框架帮我们提供测试流程

断言库，很多语言都自带，node就有，
assert可以做断言
断言有比如equal toBe

测试框架：jest, mocha,  jasmine, karma
断言库：只提供比较的功能

装了框架，一般不用再考虑断言库，会自带断言库，不过有的要，比如karma

# 测试是怎么诞生的，这些api的原理是什么？
js/js-test/deep-jest
写的项目会有一些公共的组件，或者有些公共的utils方法，就可以给这些方法加上测试

这些框架是怎么诞生的？
先不借助任何测试框架 math.js

因为业务代码常变，所以不做测试，但是有组件库，改bug,做就要做测试，这种库级别的就一定要做测试

# 测试和react怎么结合
 测试分断言库和流程管理的框架

jest有内置的断言库，测试react 其实就是测试DOM 看组件渲染在页面上ok?
vue测试用的组件库不知道
react有一个测试的组件库

## jest
文档：https://jestjs.io/docs/en/getting-started
using with react
测试react
1. create react app脚手架
2. 没装脚手架
jest babel-jest @babel/preset-env(解析js) @babel/preset-react react-test-renderer
装之前记得npm init -y
然后配一下啊babel.config.js
babel.config.js

// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
babelrc也行

环境装好了，写个组件测试一下

测试放在哪里？
新建src/components/Search -->搜索的组件 这是写源码的目录
测试的放哪里呢？
1. antd是专门每一个组件下面有一个专门放测试的目录test,也就是源码在哪，测试在哪
2. 还有一种是：
像axios 源码在lib下面，只有js文件，测试是有一个专门的测试的文件夹，跟lib文件夹里面的结构很想test/specs里面是真正放测试的
测试和源码分开，但目录长得差不多
文件中带着.spec 或者.test mocha或者karma会自动找这种的文件，是测试文件

我们直接用第一种

我们测试一个组件，实现onSubmit就行

+ 涉及表单组件，一定有两个概念：
受控组件，非受控组件
受控组件，比如input框是受控的，受当前组件的状态控制 

// 测试一下这个组件
// 之前测试的是原生js，就跟组件不一样，这个跟浏览器的页面有关
// 测试一个组件要让他渲染一下才知道结果对不对
// 而且js没有涉及浏览器的onChange 事件
// 组件dom相关的测试，还需要引入一个第三方库，他会帮我们渲染页面，触发事件
// 要一个插件 触发事件的

react测试必有的一个：Enzyme 《--出各种规范
装一下相关的东西
cnpm i enzyme enzyme-adapter-react-16(适配器，要有) -S
负责帮我们渲染
来到Search.test.js 测试文件

记住跟测试有关的都在Enzyme跟react有关的都在这里找 enzyme这个方法里面
跟断言有关的在jest上面找，

// npx jest test测试
// npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具 Mocha。
除了调用项目内部模块，npx 还能避免全局安装的模块。比如，create-react-app这个模块是全局安装，npx 可以运行它，而且不进行全局安装。
阮一峰关于npx http://www.ruanyifeng.com/blog/2019/02/npx.html

装react
缺少类属性的转换
类的写法不支持里面直接定义箭头函数的
支持的只支持componentDidMount() {}
装一个babel
@babel/plugin-proposal-class-properties
然后配到babel的插件中
"plugins": ["@babel/plugin-proposal-class-properties"]

组件第一次挂载
测试input框

enzyme的两个方法：
// shallow,mount都是组件挂载的一个方法 返回一个对象，上面有些方法
一个是浅挂载 一个是深挂载

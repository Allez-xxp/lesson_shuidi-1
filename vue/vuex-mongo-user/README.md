1. 数据流通
数据绑定 -》 数据流
vuex
- mongodb -> api -> vuex -> component
组件数据流通
- 设计一个应用场景，带着vuex的设计思考，mongodb的索引
node-user 
 npm init -y 
 yarn add express mongoose

 - 数据流源头在mongodb中，使用Express跟数据库服务器通信
 App.vue

// vuex之后，组件做不了主了，因为是数据驱动页面template
//不利于数据的管理，就不在页面上直接传数据了，请了财务
// 开发分为两部分，UI用户界面工程师（前端）组件开发功能 地方；数据流管理，也就是vuex 中央
// 地方申请数据，中央发放数据
// vuex是组件之间共享数据统一管理
// 有了vuex之后，data中基本不用，用来写自己的东西，不写共享的数据，共享的写在computed
// 使用computed申请中央数据
// data里的数据是由自己决定的，私有的

store/index.js

Vuex文档https://vuex.vuejs.org/zh/guide/

store中的state有两种获取方式
1. this.$store.state.
2. 需要计算一下的话用
mapGetters方法，可以对state进行读操作
npm换了源
https://blog.csdn.net/qq_43227958/article/details/93192069
https://www.cnblogs.com/cythia/p/10985080.html
设置npm为淘宝镜像
npm config set registry http://registry.npm.taobao.org/
还原
npm config set registry https://registry.npmjs.org/

node-user->api->store(状态管理)->components
# 疫情Vue
http://101.200.145.232/#/jiangxi
https://github.com/border-1px/2019-nCov
- vue-cli是有别于vue的
我们安装的是vue-cli是用来进行vue全家桶开发的命令行工具
1. 何为vue全家桶？
vue是一个框架，周边有一些工具
用vue-cli就是用来开发单页应用的
用/url的切换来显示不同的内容
是怎样工作的呢？
vue-cli会帮我们生成一个yiqin框架（目录结构）
2. 组件化的思维开发页面
main.js是入口-》将App.vue根组件挂载上去-》App.vue再去挂载其他组件
首先main.js #app这个元素在public/index.html
vue-cli帮我们生成的模板是怎样工作的？
npm run serve 的时候会先找到main.js执行，这里面引入了vue,vue的项目执行就是以一个vue项的实例开始的；然后里面要挂载在一个元素上，从这个元素开始就是vue的运行区域（/#app);App组件通过import引入进来，每个组件都是一个以vue后缀的一个文件，他分成三部分template、script、style。
public/index.html是一个首页模板
main.js会用vue去接管，并且在App.vue以及它之后....组件化编写(就不用分开写html,css..),-》编译成一个js文件，会塞到index.html后面，script里面让代码去执行。
vue-cli流程。

npm run build 会帮我们打包项目dist。
dist/index.html live-server启动，界面出来的跟之前的npm run serve一样的。

- 如何实现不同城市疫情的查看？
同一个页面，router转换。单页应用。头部始终不变。
url的变化。
yarn add vue-router

<!-- component是组件，views是页面级别的组件，会有路由对应（更大一点）
    向路由对应的顶级组件就放在views下面，例如about /form ...;
    component是构成页面的子组件，比如alert...构成一个页面的。 -->
加了路由页面之后要在App.vue中加上<router-view/>

- main.js是入口，挂载new Vue()
- VueRouter补全vue生态，承担路由的职责
- App.vue是根组件，
- 因为是单页面，<router-view />全局组件就是我们的占位符，由Vue.use(VueRouter)全局启用

App.vue就负责单页应用的头部导航（切换router也一直在的）
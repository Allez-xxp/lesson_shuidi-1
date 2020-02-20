import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue' 
import About from './views/About.vue' 
import View from './views/View.vue' 
// views下面放置着所有的页面级别的组件
// 1.引入vue-router
//如何实现不同城市疫情的查看？vue-router
Vue.use(VueRouter) //启用路由
// 是一个全局的，如果不加上这个Vue.use(VueRouter) //启用路由，<router-view/>就不能使用

Vue.config.productionTip = false


//这里实例化了vue
//入口，vue接管整个页面的开发
// 2.将router放到实例上去，vue就知道要怎样去配置路由
// 网站是有很多个路径的，需要有一个路由对象来管理（数组来用），有很多个链接，都由这个路由来管理
// 配置数组：routes里面放置的就是路由的规则。 (之前的后端路由现在由我们的前端来负责)
const routes = [
  {
    path:'/', //首页 http://localhost:8081/#/
    name:'Home', 
    component:Home //首页组件 那么引入Home.vue,vue一般在component下面
  },
  {
    path:'/about', //http://localhost:8081/#/about
    name:'Home', //名字，未来可以通过name属性跳转的。
    component:About 
  },
  {
    //匹配各个省份怎么做？
    path:'/*', //贪婪匹配，*匹配所有
    name:'view',
    component:View
  }
]
const router = new VueRouter({ //实例化一下，生成一个路由对象
  mode:'hash', //配置对象,路由的模式
  base: process.env.BASE_URL,
  routes //数组
})

new Vue({
  router, //第一步，启用路由。由这个可以知道，怎样表示全国的，怎样表示一个省份的
  render: h => h(App), //将app组件render进去
}).$mount('#app') //所有的元素都可以组件化
// #app这个元素在public/index.html

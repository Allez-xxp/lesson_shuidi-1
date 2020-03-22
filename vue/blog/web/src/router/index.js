import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Tag from '../views/Tag.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // 列表页
  {
    path:'/main',//首页
    name:'main',
    component:Main //交给路由级别的组件Main
  },
  // 文章
  {
    path:'/article/:id', //冒号后面是动态id,动态路由，根据id的不同，查看不同的文章
    name:'article',
    component:Article
  },
  // 每个分类下有多少文章
  {
    path:'/tag',
    name:'tag',
    component:Tag
  }
]
// 路由对象
// hash模式时，路由路径是有/#的
// 历史模式时是/
const router = new VueRouter({
  mode: 'history',//配置对象,路由的模式
  base: process.env.BASE_URL,
  routes
})

export default router

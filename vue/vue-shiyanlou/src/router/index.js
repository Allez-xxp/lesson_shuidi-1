import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'

Vue.use(VueRouter)
//封装组件引入
//有两个函数，后一个是一个延迟加载的，只有当路由是对应的路由的时候才会加载组件，可以加快页面加载速度
const __import__ = file => () => import(`@/pages/${file}.vue`)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: __import__('home'),
    //两个下划线是绝对路径，封装重复代码
    meta: {
        title: '在线做实验，高效学编程 - 实验楼' 
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于我们'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: __import__('user/profile/profile'),
    meta: {
        title: '个人设置 - 实验楼',
        login: true
    }
  },
]

const router = new VueRouter({
  routes
})
//路由的每一次切换都会执行这个方法，路由的钩子函数
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // next();

  document.title = to.meta.title
  //配置路由守卫者，登录了才能进
  if (to.meta.login) { //显示文章标题
    //大应用用store，之前是插入在components中
    // loginState就是我们的modules
      if (!store.state.loginState.sign_on) {
          next({
              path: '/login'
          })
      } else {
          next()
      }
  }
  next()   
})

export default router

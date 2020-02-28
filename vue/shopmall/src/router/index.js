import Vue from 'vue'
import Router from 'vue-router'
// 首页的直接载入
import HelloWorld from '@/components/HelloWorld'
// resolve函数的方式引入，在vue中，函数就是组件
// require用来干嘛？引入GoodsList
// @是什么？延迟加载组件
// 用户切换路由的时候，再来加载，并显示。用返回组件的函数
// const GoodsList = (resolve) => require(['@/components/GoodsList'],resolve)

// 1.从路由，看出来作者的网站的路由设计，组件，父组件，少路由，这是不够的
// 纵观路由，得到项目的站点地图，架构建立

// 这个路由页面是很少会用到的，所以没必要一开始就加载，延迟加载
// 关于相对路径和带@的路径，vue中src层级较深，写相对路径不好写，用@
// vue的微博pack提供一个叫做alias的快速连接,一般@就是一个src目录（可定义的）
// vue init webpack shopmall建项目 vue2.0，关于@在build/webpack.base.config
// 去定义一个~，assert是放静态资源的
const Login = () => import('@/components/Login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld //直接引入组件，直接加载并编译，
    },
    // 商品列表
    {
      path: '/goodsList',
      name: 'GoodsList',
      component: () => import ('../components/GoodsList.vue') //用函数，当切换到GoodsList时再去动态的加载
      // 用一个可以返回组件的函数，这里就是在切换路由的时候才加载这个文件
    },
    {
      path: '/login',
      name: 'Login',
      component:Login //前面用函数引入了，后面就不用写了
    }
  ]
})

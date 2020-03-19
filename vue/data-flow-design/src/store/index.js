import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import mutations from './mutations' //就像我们把路由分出去一样

Vue.use(Vuex)

export default new Vuex.Store({  //这里只负责返回一个单一的状态树
  state: {
    login: false,   //是否登录了
    userInfo: null, //头像，昵称
    products:{},    //货物
    cartList: []    //购物车中显示的数据列表
    //下单页面，发表评论，vue-router
  },
  mutations: {
  },
  actions: {
  }
  // modules: {
  //   //做vuex小型应用，不那么复杂，就不要modules
  //    cart
  // }
})

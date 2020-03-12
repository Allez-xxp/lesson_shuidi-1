import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//单一状态树 单一？树？
export default new Vuex.Store({
  state: { //状态
  //  users:[ //users应该在这里.放到api/index中
  //     {
  //       "address":{
  //         "city": "Los Angeles",
  //         "state": "California",
  //         "pincode": "123"
  //       },
  //       "tags":[
  //         "music",
  //         "blogs",
  //         "cricket"
  //       ],
  //       "name": "Tom Benzamin"
  //     },
  //     {
  //       "address":{
  //         "city": "赣州",
  //         "state": "江西",
  //         "pincode": "1233241"
  //       },
  //       "tags":[
  //         "coding",
  //         "blogs",
  //         "cricket"
  //       ],
  //       "name": "顾瑾颜"
  //     },
  //     {
  //       "address":{
  //         "city": "南昌",
  //         "state": "江西",
  //         "pincode": "444123"
  //       },
  //       "tags":[
  //         "swim",
  //         "blogs",
  //         "read"
  //       ],
  //       "name": "颜如玉"
  //     },
  //     {
  //       "address":{
  //         "city": "杭州",
  //         "state": "苏州",
  //         "pincode": "66123"
  //       },
  //       "tags":[
  //         "music",
  //         "blogs"
  //       ],
  //       "name": "苏杭"
  //     }
  //   ]
  },
  mutations: { //只能在这里修改
    setUsers(state,payload){ //对数据的写操作的唯一地方
      state.users = payload
    }
  },
  actions: { //负责写入状态的第一步,是一个动作，可以请求api但不能直接修改
    //跟api通信的地方
    fetchUsers(context){ //没有state只有是context上下文环境
    api
      .fetchUsers((user)=>{ //去写api模块app.vue中，注意api里方法名和适用的一致性
        // console.log(users);
        // 写入state，会严格一些，要走一个流程
        context.commit('setUsers',users)
      })
    },
  },
  getters: { //相当于state的computed函数，进行重新计算的，要进行处理时就加
    getUsers(state) { //是一个函数,vuex会给getters一个形参state,getters是对状态的一个读操作
      return state.users.map()
    }
  },
  modules: {
  }
})

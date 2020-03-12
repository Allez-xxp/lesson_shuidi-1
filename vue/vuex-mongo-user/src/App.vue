<template>
  <div id="app">
    <!-- <div v-for="(user,index) in $store.state.users" :key="index"> 有了getters就能换一个api了 -->
      <div v-for="(user,index) in getusers" :key="index">
      {{user.id}}{{user.name}}
    </div>
    <!-- 改user为state ,vuex 的store中的数据-->
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapGetters,mapActions} from 'Vuex';
//本地map值借 mapGetters api 要什么，拿什么 他只是对$store.state进行读操作

export default { 
  name: 'App',
  //data里的数据是由自己决定的，私有的，不然放了共享的数据，如果改了会使数据不一致
  data(){ 
    // vuex之后，组件做不了主了，因为是数据驱动页面template
    //不利于数据的管理，就不在页面上直接传数据了，请了财务
    // 开发分为两部分，UI用户界面工程师（前端）组件开发功能 地方；数据流管理，也就是vuex 中央
    // 地方申请数据，中央发放数据
    // vuex是组件之间共享数据统一管理
    return{
      //展示一个用户列表
      // users:[ //users不应该在这里
      //   {
      //     "address":{
      //       "city": "Los Angeles",
      //       "state": "California",
      //       "pincode": "123"
      //     },
      //     "tags":[
      //       "music",
      //       "blogs",
      //       "cricket"
      //     ],
      //     "name": "Tom Benzamin"
      //   },
      //   {
      //     "address":{
      //       "city": "赣州",
      //       "state": "江西",
      //       "pincode": "1233241"
      //     },
      //     "tags":[
      //       "coding",
      //       "blogs",
      //       "cricket"
      //     ],
      //     "name": "顾瑾颜"
      //   },
      //   {
      //     "address":{
      //       "city": "南昌",
      //       "state": "江西",
      //       "pincode": "444123"
      //     },
      //     "tags":[
      //       "swim",
      //       "blogs",
      //       "read"
      //     ],
      //     "name": "颜如玉"
      //   },
      //   {
      //     "address":{
      //       "city": "杭州",
      //       "state": "苏州",
      //       "pincode": "66123"
      //     },
      //     "tags":[
      //       "music",
      //       "blogs"
      //     ],
      //     "name": "苏杭"
      //   }

      // ]
    }
  },
  // 有了vuex之后，data中基本不用，用来写自己的东西，不写共享的数据，共享的写在computed
  // 使用computed申请中央数据 mapGetters
  // 有了getters后据能用另一个api
  computed:{ 
    ...mapGetters(['getUsers'])  //结构出来
  },
  components:{

  },
  methods:{ //vuex action
    ...mapActions(['fetchUsers'])
  },
  mounted(){ //生命周期取数据
    //ajax 两层 Tcp三次握手，更加安全
    // 触发actions api dispatch里面写action名字，就能让他得到触发
    // 这个api就会去派遣一个动作
    // this.$store.dispatch('fetchUsers'); 改用methods试试
    this.fecthUsers();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

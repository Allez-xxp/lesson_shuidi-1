<template>
  <div id="app">
    <!-- 通过手写的js来动态生成fontsize -->
    <!-- <div style="width:16rem;height:2rem;background-color:red;"></div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <!-- 首页 -->
    <!-- <head-top headTitle="东华理工大学广兰校区">
      slot插槽,插logo，放在左边，组件中放上一个占位符，放哪里插哪里
      <span class="head_logo" slot="logo">ele.me</span>
    </head-top> -->
    <!--地址 -->
    <head-top head-title="编辑地址" go-back="true">
      <span class="head_logo" slot="logo">ele.me</span>
      <!-- slot的name来区分编辑和logo的不同位置 -->
      <span class="edit" slot="edit">编辑</span>
    </head-top>
    <!-- 不能直接用标签名header -->

    <!-- alert 通用功能 要引入的 -->
    <!-- 1. alert平时不显示，要的时候，比如点击按钮后触发 -->
    <!-- 有的提示有误，或者要登录等 要让alert-tip成为通用的，有外界决定有或无的 用冒号表示是js运行区域,用来传参 -->
    <!-- @closeTip自定义事件 子组件定义，通知了父组件 -->
    <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="closeAlert"/>
    <!-- 怎么让他出现？ -->
    <button @click="showCancelAlert">提示退出</button>
    <button @click="showLoginAlert">提示登录</button>
  </div>
</template>
<script>
import Header from './components/header/header'; //封装这个组件
import AlertTip from './components/common/alertTip'; //通用组件放components下面

export default {
  data() {
    return {
      showAlert :false,
      alertText: '' //传给组件，赋值组件
    }
  },
  methods:{
    showLoginAlert(){
      this.alertText = "你真的要登录吗？"
      this.showAlert = true
    },
    showCancelAlert(){
      this.alertText = "你真的退出吗？"
      this.showAlert = true
    },
    closeAlert(){
      this.showAlert = false
    }
  },
  components: { //组件声明
    // 不能与标签的header重合，怎么解决？
    // head-top是在页面上的标签名  Header是类名
    "head-top": Header,

    // 组件注册过的才能用，要先注册 这是外界导入的AlertTip
    'alert-tip': AlertTip
  }  
}
</script>
<style lang="stylus">
@import "./style/common.styl"
@import "./style/mixin.styl"

.head_logo
  left .4rem 
  font-weight 400
  sc(0.7rem, #fff)
  wh(2.3rem, 0.7rem)
  ct()

.edit
  right 0.4rem
  sc(0.7rem, #fff)
  ct()
button 
  margin-top 150px
  border 1px solid #777
  margin-left 30px
</style>

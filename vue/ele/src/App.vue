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
  </div>
</template>
<script>
import Header from './components/header/header'; //封装这个组件

export default {
  components: { //组件声明
    // 不能与标签的header重合，怎么解决？
    // head-top是在页面上的标签名  Header是类名
    "head-top": Header
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
</style>

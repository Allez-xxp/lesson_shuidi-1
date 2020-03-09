<template>
  <div id="app">
    <!-- <el-alert 
    title="成功提示的文案"
    type="success" 
    :showIcon="true" 
    :closable="true" 
    closeText="" 
    description="success"
    ></el-alert> -->
    <!-- 有两个参数title和type(会对应不同的css) -->
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- :showIcon="false"
    传递number Boolean object array类型的时候注意，做动态绑定，否则传递过去的参数类型会不正确，比如number会变成String 
    :closable="true" closeText="关闭"-->

    <carousel height="150px">
    <carousel-item v-for="item in 4" :key="item">
      <h3 class="small">{{ item }}</h3>
    </carousel-item>
    </carousel>
  </div>
</template>

<script>
// import ElAlert from './components/ElAlert.vue'

export default {
  name: 'App',
  components: {
    // ElAlert  //导入了组件要记得写一下，然后建相应的文件ElAlert.vue
    // 'carousel': Carousel //自定义组件时这样写，组件名大写的时候组件里面的html标签小写
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html, body {
  background-color: blueviolet;
}
</style>

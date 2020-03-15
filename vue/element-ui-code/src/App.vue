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
    <!-- <el-button type="primary">按钮</el-button> -->
    <carousel height="150px">
    <carousel-item v-for="item in 4" :key="item">
      <h3 class="small">{{ item }}</h3>
    </carousel-item>
    </carousel>
    <el-button 
      type="success" 
      nativeType=""
      loading
      round 
      plain
      icon="el-icon-edit"
      @click="upload"      
       >按钮</el-button>
    <el-button 
      type="text"          
    >文本按钮</el-button>
    <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>

       <!-- 这里给slot加了name,因为$slots.default就不会为true了（因为slot不为default）所以不会输出 -->
       <!-- Boolean的有值即为真，所以只需要传round就可以了 
       icon="el-icon-edit"去掉就没有东西在按钮上了，处理loading
       交给业务层处理点击事件，在这里定义的是上传事件，在ElButton.vue中定义的是Click点击事件 -->
       <!-- nativeType="submit"表单提交 reset，表单重置 -->
       <!-- 添加loading能力 -->
  </div>
</template>

<script>
// import ElAlert from './components/ElAlert.vue'
import ElButton from './components/ElButton.vue'
export default {
  name: 'App',
  components: {
    // ElAlert  //导入了组件要记得写一下，然后建相应的文件ElAlert.vue
    // 'carousel': Carousel //自定义组件时这样写，组件名大写的时候组件里面的html标签小写
    ElButton 
  },
  methods: {
    upload(evt){
      console.log(evt);
    }
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

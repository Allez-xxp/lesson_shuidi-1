<template>
  <div id="app">
    <!-- 这个是属于App.vue的，根组件的。 -->
    <!-- <h1>页面标题</h1> -->
    <!-- 单页应用的头部导航 -->
    <nav class="nav">
      <ul>
        <li>
          <!-- router-link是什么？替代a标签 -->
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/about">关于</router-link>
        </li>
        <li>
          <router-link to="/jiangxi" >江西</router-link>
        </li>
      </ul>
    </nav>

    <router-view/> 
    <!-- 匹配路由的占位符 -->
    <!--编译完Home.vue后，就会放到这里。 是一个全局的，如果不加上这个Vue.use(VueRouter) //启用路由，<router-view/>就不能使用 -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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

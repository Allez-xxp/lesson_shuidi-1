<template>
  <div id="app">
    <!-- 根组件，所有页面中都会展示 -->
    <!-- 假设search外面有个container,本例子是用来解释scoped的 -->
    <!-- <div class="container"></div> -->
    <search />
    <router-view/>
  </div>
</template>
<script>
import Search from './components/Search'; //去components设计这个组件
export default {
    components:{
      Search
    }
}
</script>
<style>
/* 全局样式 */
*{
  margin: 0;
  padding: 0;
}
#app{
  padding: 0 15px;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

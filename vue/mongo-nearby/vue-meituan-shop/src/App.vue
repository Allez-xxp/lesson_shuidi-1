<template>
  <div id="app">
    <!-- template里面不用加this 不在{{}}里面加,因为里面是js运行区,-->
    {{$store.state.latitude}}
    {{$store.state.longitude}}
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    console.log(this.$store.state)
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

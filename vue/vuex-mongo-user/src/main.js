import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store, //就可以用this.$store.state返回单一状态树
  render: h => h(App)
}).$mount('#app')

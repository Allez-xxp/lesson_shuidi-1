import Vue from 'vue'
import App from './App.vue'
import router from './router'
//大型项目中组建如何兼容 rem是第一项要考虑的
import './config/rem'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

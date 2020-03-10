import Vue from 'vue'
import App from './App.vue'
import hubutui from '../packages'

Vue.use(hubutui)

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')

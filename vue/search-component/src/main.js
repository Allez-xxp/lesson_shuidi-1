import Vue from 'vue'
import App from './App.vue'
import router from './router'

import iView from 'iview'; //ui组件库，70%常用，成熟的ui框架
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false
Vue.use(iView); //iview的组件全局都可访问

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

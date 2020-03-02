import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //样式

Vue.use(ElementUI) //就能全局访问了

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

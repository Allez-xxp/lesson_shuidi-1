import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from '@/utils/base.js'
//utils将常用的工具类插入到Vue的prototype中，$store也是同样的原理
// import Plugins from '@/plugins/index.js'
//插件

Vue.config.productionTip = false
Vue.prototype.utils = utils
// Vue.use(Plugins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

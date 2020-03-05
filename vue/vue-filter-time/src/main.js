import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

//过滤器还能全局声明,直接注册在Vue上
Vue.filter('format_date',function format_date(value){
  const date =new Date(value);
  // console.log(date);
  // return `${date.getFullYear()} 年 ${date.getMonth()+1}月 ${date.getDate() }日 ${date.getHours()} 时 ${date.getMinutes()} 分 ${date.getSeconds()} 秒`;
  return moment().format('YY-MM-DD HH:mm:ss')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

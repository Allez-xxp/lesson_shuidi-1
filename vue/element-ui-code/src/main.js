import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //css先保存
// Vue.use(ElementUI);

//引入组件，他们都想成为全局组件，把他们放到一个数组中
import Carousel from './components/carousel/index.js';
import CarouselItem from './components/carousel-item';

// 1.Vue.component(Carousel.name,Carousel)
// Vue.component(CarouselItem.name,CarouselItem)
// console.log(Carousel)
// 2.Carousel.install(Vue) //就会调用Carousel中的install方法
// CarouselItem.install(Vue)
const components = [
  Carousel,
  CarouselItem
];
// //Vue.use 会调用对象的install方法 
const install = function(Vue){
  components.forEach(component =>{ //调用forEach
    console.log(component)
    // Vue.component 是vue语法中，可以全局引入组件的api 会沿着原型链
    // Vue.component(component.name, component) 
    component.install(Vue)//1 调用的是每个组件的index.vue下面的install方法
  })
}
//install是一个方法，封装了成为组件的细节
install(Vue) //2

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

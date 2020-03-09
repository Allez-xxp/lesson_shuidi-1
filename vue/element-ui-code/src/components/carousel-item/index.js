//入口文件
import CarouselItem from '../carousel/src/item'; //将main.vue引入
//install，要安装到哪里去
CarouselItem.install = function(Vue){
    Vue.component(CarouselItem.name,CarouselItem)
}
export default CarouselItem;//向外输出
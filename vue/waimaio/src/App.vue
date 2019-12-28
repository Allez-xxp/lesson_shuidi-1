<template>
  <div id="app">
    <!-- 组件化思维 冒号后面的seller="seller"是json数据，名字叫seller，前面的seller是属性，用props拿属性-->
    <v-header :seller="seller"></v-header>
     <!-- <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
    </div>
   <router-view/> -->

   <div class="tab border-1px">
     <div class="tab-item">
       <router-link to="/goods">商品</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/ratings">评论</router-link>
     </div>
    <div class="tab-item">
       <router-link to="seller">商家</router-link>
     </div>
   </div>

  <!-- 显示每个按钮跳转的页面会显示的内容 -->
   <router-view />

    <v-footer />
  </div>
</template>
<script>
// 引入组件
import header from './components/header/header.vue'
import footer from './components/footer/footer.vue'
// 取数据
const response=require('./common/data/seller.json');
console.log(response);

import { urlParse } from './common/js/util';
export default {
  data(){
    return{
      seller:{
        // name:'范家农庄'
        // 立即执行函数
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  // data提供页面要的数据

  // 声明用了哪几个组件，一个一个往下排 'v-header'这个名字自定义
  components: {
    'v-header': header,
    'v-footer':footer
  },
  //生命周期create相当于小程序里的onLoad,响应式的
  created(){
    // this.seller=Object.assign({},this.seller,{'a':'b'})
    this.seller=Object.assign({},this.seller,response.data)
    console.log(this.seller);
  },

}
</script>
<style lang="stylus">
@import "./common/stylus/mixin.styl"
*
  margin 0
  padding 0

.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  // border-1px(rgba(7,17,27,0.1)) 一像素的边框混合，画一像素的边线
  border-1px(rgba(7,17,27,0.8))
  .tab-item
    flex 1
    text-align center
    // &表示与上一级平级
    & > a
      display block
      font-size 14px
      text-decoration none


/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */


</style>

<template>
  <div id="app">
    <div class="user">
      <div class="back" @click="back">
        <!-- 放图标图标库 -->
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="switches-wrapper">
       <switches :switches="switches" :currentIndex="currentIndex" 
       @switch="switchItem" />
      </div>
    </div>
    <!-- <router-view/>   <switche/>//自定义组件-->
     <!-- @click="back"等同于v-on click="black" -->
      
  </div>
  
</template>

<script>
import Switches from './components/switches/switches';
export default {
  data(){
    return{
      currentIndex:0,
      switches:[
        {
          name:'我的收藏'
        },
        {
          name:'最近播放'
        },
      ]
    }
  },
  methods:{
    back(){
      console.log('回上一页');
    },
    switchItem(index){
      this.currentIndex=index;
    }
  },
  components:{
    'switches':Switches
  }
  
}
// export default模块输出  'switches':Switches switches该自定义组件由Switches类提供
</script>
<style lang="stylus">
// variable专门存变量的
@import "./common/styl/reset";
@import "./common/styl/variable";

@font-face {
  font-family: 'FontAwesome';
  src: url('./common/font-awesome/fonts/fontawesome-webfont.eot');
  src: url('./common/font-awesome/fonts/fontawesome-webfont.eot?#iefix') format('embedded-opentype'),
    url('./common/font-awesome/fonts/fontawesome-webfont.woff2') format('woff2'),
    url('./common/font-awesome/fonts/fontawesome-webfont.woff') format('woff'),
    url('./common/font-awesome/fonts/fontawesome-webfont.ttf') format('truetype'),
    url('./common/font-awesome/fonts/fontawesome-webfont.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}
.fa
  display inline-block
  // 14px/1,字体14px,行高为1
  font normal normal normal 14px/1 FontAwesome 
  font-size inherit //与外部一样
  text-rendering auto //字体渲染
  -webkit-font-smoothing antialiased //防止有边边角角
.user
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  // 支持使用变量
  background $color-background
  .back
    position absolute
    top 0
    left 4px
    // &.引用上一层（平级的）
    .fa-angle-left
      padding 5px 10px
      font-size 30px
      color #ffffff
      &:before //有内容就可以成为伪元素
        content "\F104"
  .switches-wrapper
    display flex
    align-items center
    background red
    height 44px
</style>

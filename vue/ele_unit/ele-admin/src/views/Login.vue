<template>
  <div class="login_page fillcontain">
    <!-- vue 内置组件  带来特效-》当它的子元素从不显示到显示  主持人， 报节目 出现后立即消失
    从不显示到显示 v-if v-show都会触发 但是v-if如果为false则html里面连标签都不会出现，但是show会有标签出现 -->
    <transition name="form-fade">
      <!-- 进场的切换时产生四个类名 
      name:form-fade,等下添加特效的前缀（约定要有一个v-show或v-if），提供类名
      class:
      form-fade-enter 刚开始的时候，那一霎那，透明度为0的，form_container一开始时没有设置透明度的，opacity为1的
      form-fade-enter-active
      form-fade-leave 离开的开始状态，一帧
      form-fade-leave-active 离开
        进场 false -> true   form-fade-enter 这类名只出现在 短暂时间 
        元素插入之前生效， 在插入之后的下一frame 移除 
        form-fade-enter-active 进入的过程之中就是transition 时间我们这里是1S 
        .form-fade-enter -> .form-fade-enter-active(1s)
        出场  true -> false
        form-fade-leave 离开的开始状态  一frame
        form-fade-leave-active 离开
        要有效果，要配合v-show使用进场的切换才能触发特效，所以有false->true的设置
      -->
      <section class="form_container form-fade-enter" v-show="showLogin">
        <div class="manage_tip">
          <p>elm后台管理系统</p>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>

export default {
  data() {
    return {
      showLogin: false
    }
  },
  mounted() {
    this.showLogin = true
  }
}
</script>
<style lang="stylus" scoped>
.login_page
  height 100vh
  background-color #324057
.manage_tip
  position absolute
  width 100%
  top -100px
  left 0
  p
    font-size 34px
    color #ffffff

.form_container
  width 320px
  height 240px
  position absolute
  top 50%
  left 45%
  margin-top -160px
  margin-left -120px
  padding 25px
  border-radius 5px
  text-align center
  background-color #ffffff
  .submit_btn
    width 100%
    font-size 16px
// 动态的产生四个类
.form-fade-enter-active, .form-fade-leave-active //正在。。。，设置transition事件
  transition all 1s
  // 支持属性的变换产生一个特殊的效果
// 刚开始时 虽然show为true，但我们把透明度设为0了，马上就不可见了   原来 opacity 1 设置进入的初始状态
// 进入到真正进入 最后的样式opacity 1 transform translate3d(0, 0px, 0)
// - 只在一帧的事件
// form-fade-leave一帧时间 就是true-》false那瞬间出现的类名当时还没为他设置样式时也就是 opacity 1 translate3d(0, 0px, 0)，然后出现了之后，就要消失了，transition变成-50px
// opacity 0 translate3d(0, -50px, 0)
.form-fade-enter, .form-fade-leave-active //进来那一瞬间和离开的整个过程中，将原有状态设置一下
  transform translate3d(0, -50px, 0) //从上面降下来的效果
  opacity 0 //不可见
// 所以只要记住他们最后的状态是什么（也就是跟已有的样式是反着来的），而期间的过渡效果交给transition来做。
</style>

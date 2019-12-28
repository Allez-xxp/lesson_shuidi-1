- 组件式开发
  页面有组件构成（相拼乐高一样拼页面），而非标签（传统切页面）
  Facebook 有一万多个组件拼起来，组件式开发可以进行复用
  components/header/header组件目录，效力于多个页面，用于实现复用
  声明组件的过程：footer.vue中,记得在app.vue里import
  template--模板
  script
  style

- Object.assign({},....)
来自es6,一个对象创建新的对象

- import from 让开发模块化

bg-image('brand')混合 stylus里的
@import "../../common/stylus/mixin";样式引入到common/stylus/mixin
bg-image($url)<=写在相应文件夹下
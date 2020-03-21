原项目git地址：
https://github.com/HuberTRoy/vue-shiyanlou/blob/dev/src/main.js
开源项目把他走通，了解细节，实验楼的项目为例
在做前，学类似开源
# main.js
1. 防抖节流
2. 手写图片懒加载 img_lazyload
IntersectionObserver

3. utils  prototype原型链
如果用lodash vue-lazyload比较大，大的话页面加载就慢
用工具，好处就是省时间，坏处就是体积大，下载慢。
用utils节省大小，同时实现功能。
怎么用？App.vue中
export default {
  mounted() {
    console.log(this.utils); //"object"  mnthis会沿着原型链一直查找，会找到utils,打印出其中定义的对象
  }
4. url的参数的处理 params的查询，从字符串到对象的转变 translate_query

# router/index.js
1. 加一个pages，有了pages就可以不要views
2. 路由守卫
meta{title: '',login:true}
是否登录，结合store 使用vue-cookies
# 走组件
页面组件化 pages/home.vue
1.  require.context 一次性引入多个文件
https://juejin.im/post/5d9d386fe51d45784d3f8637

const path = require('path')  //node的模块 require是commonjs规范，不是es6规范，不过是老的方案，es6也能用
const files = require.context('@/components/home_page', false, /\.vue$/)  //引入该目录下的所有文件。 false:是否递归，文件是以.vue结尾的
const modules = {}
files.keys().forEach(key => {
  // console.log(key);
  const name = path.basename(key, '.vue')  //基础文件名
  console.log(name);
  //json object
  modules[name] = files(key).default || files(key)
});

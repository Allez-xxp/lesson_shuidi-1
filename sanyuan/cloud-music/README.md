## react最佳实战
1. 做项目 reset重置 默认
最近react 知识点
用styled-components
yarn add styled-components
样式组件的使用 css in js
src目录下新建style.js
index.css删掉 App.css也删掉 过时了 现在用style-components
处理index.js 和APP.js文件

用style.css
2. 如何给项目添加iconfont 图标？
首先去阿里的iconfont 选择向下的图标 放到图标字体库中，然后用
App.js中 再加一个IconStyle 测试一下
3. 全家桶
react-router-dom  vue-router  配置？有
新建routes目录
react-router-config

4. 每个组件做法 func_component 函数式组件 + style.js(css)

5. tabbar怎么做
上面和下面是两种写法 一个是静态的 用styled-components写
动态的 redux + api

# 静态页面都用styled-components bar什么的静态的
6. 幻灯片
要有数据
怎么个流程？
  1. 数据先到位
  2. 然后加效果
  3. 请求api请求数据，然后MVVM
  store/index.js生成状态树的地方
  要做动态的了
什么教immutable？
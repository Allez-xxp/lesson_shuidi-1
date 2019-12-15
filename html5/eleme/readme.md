- 工作流
  script脚本区域，在package.json中,强化我们的开发
  dev启动我们的http服务
  styl stylus 编译为css
  启用json-server 商家信息（在seller.json中)

- dom api是过去式
  MVVM 数据驱动的界面
  MVVM{{}} 两个花括号是模板需要编译的部分
  js.data数据放入输出
  历史 切图仔 10年前是 php/java+html/css
  <% message%>前端不需要了解数据后端
  js 8年前 web 2.0 fetch /ajax js 主动请求数据
  前后端分庭抗礼 DOM/ api
  4年前 vue/react+node+flutter（客户端）+GO+docker 时代 MVVM时代 数据也要处理

  小程序和vue是一样的
  mvvm优点在于简单
  - 天生集成数据驱动 表现在:有data字段 data{{}} :src
  - 页面数据是响应式的，只要数据变了，界面就会变（不需要手动刷新页面）
  
    启动：
  npm run dev
  npm run styl
  npm run api

  - inline-block 重点！
    inline属性没有设置宽高能力，但兄弟间相安无事，不会把其他元素挤下去
    block兄弟间会换行
    我们的需要两列是布局，左边一个右边一个
    （原来用浮动）用inline-block,副作用：兄弟间会产生间隙 解决：设font-size:0
    或者让两个盒子紧挨着 </div><div class="content">
    这是浏览器实现inlie-block的天坑 
    - 换行\n 由font-size决定
       父元素 font-size:0
    - 换行元素首尾相连，但会影响结构的可读性
  - stylus 向css提供了函数功能
    利用返回值的叫函数 
    直接效果：可以复用（重复利用）利用css代码，完成css的模块化 
    叫做minin 混合
    <!-- bg-image($url)
    background-image url($url+"@2x.png")
    // 媒体选择器 最小设备像素比例（也就是屏幕比例）
    @media (-webkit-min-device-pixel-ration:3),(min-device-pixel-ration:3)
        background-image url($url+"@3x.png") -->
  - 图片，手机的像素是不一样的
    @media 后面是条件 （媒体查询）
    -webkit 浏览器的选择 -min-device-pixel-ration:3 最小像素密度比为3
    手机中图片的命名：...@2x.png  ...@3x.png
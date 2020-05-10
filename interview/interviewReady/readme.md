# 项目
1. 网易严选
 + 这是一项我目前还在继续项目，这个项目的主要目的是实现了功能之后，学习怎么优化里面的细节，比如我的搜索框在搜索商品的时候，他其实应该做一个节流，不是防抖，因为不是要让它只执行最后一次，希望我在输入的时候，虽然不需要它每时每秒在我稍微有点风吹草动的时候就特别激动，导致一致发送服务器请求，导致过度浪费资源，但我又希望他在一定时间内他又能执行一次，因为有些时候会忘了要输入的具体是什么就需要给点提示，所以会在比如说隔个两秒就执行一次。手写一个节流throttle.html
 + wxparse重复渲染问题
 目前已知唯一可以转化HTML到小程序识别的插件
 转换一个HTML标签可能需要大量的微信小程序标签还有样式
 + 点击商品详情的时候，总会显示上一次的详情，然后再加载新的内容
 用生命周期钩子优化没用，详情页面卸载清空数据的方式实现，但是卸载之后会没有数据，所以回收平加载白屏时间有点长，通过进来详情的前一个页面预加载详情页面的数据，通过统计的方式预测用户行为来实现预先加载下一屏的数据
 + 比如懒加载，数据分屏显示，数据预加载
# 邬嗣敏秘籍
1. css
- css盒模型
有两种，一种是IE盒子模型，一种是W3C
box-sizing border-sizing: border-box, inherit, content-box
默认情况下，width元素包括border和padding,如果设置了如果设置border-box就包含边框和内边距了，在封装控件计算width的时候就不用考虑变宽和内边距问题了
设置border-box后，在布局的时候设置width=50%可以确保平分，也不用考虑padding和border的问题了。
- 画一条0.5px的线
https://segmentfault.com/a/1190000013998884?utm_source=tag-newest
- 不知道宽高的情况下，让盒子居中
+ display:flex; justify-content:center;align-items:center;
+ 父容器 position: relative;
  子position:absolute; transform:translate(-50%,-50%);top:50%;left:50%;
translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中。
当使用：top: 50%;left: 50%;， 是以左上角为原点，故不处于中心位置。
translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。
与负margin-left和margin-top实现居中不同的是，margin-left必须知道自身的宽高，而translate可以在不知道宽高的情况下进行居中，tranlate（）函数中的百分比是相对于自身宽高的百分比，所以能进行居中。
2. 布局面试
- flex布局 bootstrap的grid 栅格布局
垂直对齐：
<div class="row align-items-center"><div class="col align-self-center">
水平对齐：
<div class="row justify-content-center">
3. js
- this的指向


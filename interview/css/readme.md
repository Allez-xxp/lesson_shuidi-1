css中有多少种方法提高css的办成效率和复用性
- stylus/less/sass css的预编译 https://blog.csdn.net/weixin_40161974/article/details/102880172
- normalize.css或者说reset.css 
- oo 面向对象的css 取一个类名
- styled-components --> css in js
- css新特性 css的本身特性就可以定义变量 css4

变量嵌套函数是css描述性到编程性的表现
他有stylus/sass预编译，还有css in js 组件语法
如果浏览器不支持，用postcss

css4有什么优势？
2.html
css4有什么stylus不能做的呢？
web component vue/react
css4拥有stylus不具有的东西
优势：js还可以操作变量

https://www.zcfy.cc/ 众成翻译，可以找到很多文章
张兴序

3.html
this在css中很灵活
css中很坑的地方 BFC

如何实现：用纯css做抛物线 月影 按钮内部视觉动态效果随着鼠标有光晕
细化css知识点：css variable css于js交互的效果 
color-mod()
环形渐变 
总结能力
1. 环形渐变
2. js的mousemove事件
3. css变量，js改变，动态生成颜色渐变
4. transition
依赖于css环形渐变，实现的可交互的按钮特效，基于js事件机制，可以计算到按钮内部环形渐变中心点，跟鼠标位置相关的偏移量，事件机制得到鼠标偏移量，将环形渐变背景的位置进行定位。
通过mousemove得到鼠标偏移量
利用css变量动态改变颜色渐变
 stylus -w button.styl -o button.css 运行

outline none  //里面不会超过父元素，不会吧父元素撑大 //outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。
CSS3 径向渐变（radial-gradient）
https://www.cnblogs.com/lhb25/archive/2013/02/24/css3-radial-gradient.html
https://www.runoob.com/cssref/func-radial-gradient.html
如何保障代码优质？
编程风格 eslint
设计模式
保证代码的正确性 TDD 测试驱动开发 test drive development
新建文件tdd

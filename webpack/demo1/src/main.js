// webpack怎么在js文件里处理css文件？
//引入css文件 用loader解析css文件
// const css = require('./index.css');
const css = require('css-loader!./index.css');  //！将css文件和loader文件分离

//并不是水火不相容的 css其实就是一些属性结点 css文本
// dom node结点 dom树上再使用css { width...} 添加到节点上
//css in js
//图片也可以 以二进制的形式引入
const a = 100;

// console.log(a);
console.log(a, css);  //"100 {}"
// 为什么css文件是空的时候 输出的是：“{}”呢？
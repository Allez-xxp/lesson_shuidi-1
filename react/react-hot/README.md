一个重要的结论：
面向对象为什么要有类？
为什么要封装类 
oop是对数据的一个抽象
FP函数式编程 function programing 是对过程抽象


let a = 1 + 2 - 3;
let b = 2 + 3 - 6;
let c = 4 + 2 - 5;
//都是某两个数相加然后减掉一个数，先求和，再求差 这个就可以把他抽象出来
//共同点 封装起来 不同的通过参数传进来
//http://www.baidu.com?a=1&b=2&c=3 => 变成{a: 1, b: 2, c: 3}
//http://google.com?key=val
//相同的过程封装在函数体内部
function urlParse(url) {
  return {}
}
function operation(a, b, c) {
  return  a + b -c    //求和 求差
}
//都是想这样封装的，这个就是对数据的抽象

2. FP的过程抽象
节流防抖
index.js
防抖节流区别：
窗口的resize会频繁触发页面的重排 重绘
高频触发的事件
只在某个时间间隔触发一次-》节流 会重新开始计时 总是以固定的时间间隔触发事件 
防抖也有一个时间间隔 假设2秒 点一下等着两秒后 再执行 假设一开始点了一下 一秒后又点一下，那他会重新计时，上次的时间就不算了，重新计两秒，以最新的时间推算事件

高阶函数： high order function 就是：输入是一个函数，返回也是一个函数
在react中叫高阶组件 high order component
写一个简单的高阶组件
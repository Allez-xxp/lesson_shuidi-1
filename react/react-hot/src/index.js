import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <button id="add">add</button>
    <button id="min">min</button>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

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
  return  a + b - c;    //求和 求差
}
//都是想这样封装的，这个就是对数据的抽象
//我们已经把 url这个数据抽离出来 和urlParser方法是分离的
//不管是抽象成一个方法还是一个类 都是差不多的思维：对数据抽象
class Url {
  urlParse() {}
  urlStringfy() {}
}

// FP
//节流 时间戳方式
window.onload = function() {
  const add = document.getElementById('add');
  const min = document.getElementById('min');
  let delay = 2000;
  let prev = Date.now();
  add.onclick = function() {
    // console.log(add);
    let now = Date.now();
    if (now - prev > 2000) {
      console.log('发出请求');
      prev = now;
    }
  }
  //两个按键都要节流，怎么封装 都是用时间戳方式
  // 1. prev 2. now 3. 判断时间间隔 4. prev = now
  //Lodash里面有封装一个 loadsh: throttle(func, [wait=0])
  //过程抽象 对节流处理过程抽象
  min.onclick = throttle(function() {
    console.log('send req');
  },2000)
  //开始
  //封装思路：
  //相同的要封装 那4步封装进来 
  //不同的用参数的方式传进来 不同：发的请求不一样 也就是function不一样，所以要传一个函数
  //函数是一等公民，就是说函数和其他变量有同等的地位，他们都可以当作比如Number, string
  //就是都可以当作函数的参数传递，也可以当作函数的返回值返回 
  //这里就是会返回一个具有节流功能的函数

  //高阶函数： high order function 就是：输入是一个函数，返回也是一个函数
  //在react中叫高阶组件 high order component
  function throttle(func, wait) {
    let time1 = Date.now(); //1.拿到当前时间 函数触发的时候才需要拿到当前时间
    //怎么知道它什么时候触发？别人都把他要干的是传过来了，当然由你决定
    //怎么用？别人把干的事给我，我要给别人返回一个函数 
    //min.onclick = 函数
    //里面也是一个函数，外面也是一个函数
    return function() {
      //里面这层函数，就是我们返回给onclick的，所以onclick执行的就是里面这个函数
      let time2 = Date.now(); //2.
      //3
      if(time2 - time1 > wait) {
        //间隔的时机到了，执行
        func()
        time1 = time2;
      }

    }
  }
}
//防抖节流
//用时间戳来做 思想：

//假设有一个场景 A,B组件都需要获取当前的鼠标位置信息
//先完成A要可以获取鼠标信息：坐标信息就好
// 去App.js

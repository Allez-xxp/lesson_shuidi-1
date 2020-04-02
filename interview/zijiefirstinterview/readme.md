1. A 垂直居中
这两个都可以flex;position
position: absolute relative fixed static sticky  这是position的所有取值
absolute：绝对定位 相对于父级第一个非static定位,如果没有（比如父级没有设定位） 那就找视窗  移除文档流
relative: 相对于自己
fixed： 视窗 移除文档流
static： 默认 不加position 默认就是static  
sticky: 粘性 滚动才能看到效果 根据最近滚动祖先动 基于top buttom left定位
sticky示例:
<!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
  .out {
    border: 1px solid #000;
    height: 200px;
    width: 100px;
    overflow: scroll;
  }
  .inner {
    border: 1px solid red;
    width: 20px;
    height: 20px;
    margin-top: 1000px;
  }
  .inner1 {
    border: 1px solid green;
    width: 20px;
    height: 20px;
    margin-top: 40px;
    position: sticky;
    top: 10px;
  }
  </style>
</head>
<body>
  <div class="out">
    <div class="inner1"></div>
    <div class="inner"></div>
  </div>
</body>
</html> -->
body {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
    }

.out {
    /* position: absolute; top: 50%;
    transform: translateY(-50%);  */
    background-color: blue;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    font-size: 20px;
}

2. 函数中的arguments  把他变成一个真正的数组 用Array.from转化
是类数组对象 
3. 两个=
if([] == false) {console.log(1)};  //[]->""->0 === false->0  true
if({} == false) {console.log(2)};  
//({}).toString()-->"[object Object]"-->Number('[object Object]')->NaN 不等于 false
if([]) {console.log(3)};   //[]->true
if([1] == [1]) {console.log(4)};  //false

类型转换
不关注类型 只关注值是否相等 两个值的类型不等式 会进行类型转换(转换规则表)
===是严格等
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness

ToPrimitive 都是作用在Object上的 把对象转为原始值 调用toString() /valueOf()方法
基本数据类型（原始）变量及变量对应的的值
复杂数据类型（对象）
{} == {} //false
let a=[1],b=[1],c=4,d=4;
c==d   //true  c和d指向同一地址的值
a == b //false 指向的内存地址不一样

栈内存和堆内存 不是js独有的
栈内存（小，灵活） 
    存基本数据类型（原始）
    变量（它存的是对 对象的地址，指向） 比如 a = 4
堆内存（大，可以任意对内存进行扩大，缩小）
    存复杂数据类型（对象）：比如（数组a = [1]）
    变量是存在栈内存中，但是值存在堆内存中
4. 以最小的改动解决以下代码的错误（可以使用es6）
const obj = {
name: " jsCoder",
skill: ["es6", "react", "angular"], 
say: function () {
    for (var i = 0，len = this.skill.length; i < Len; i++) {
        setTimeout(function () {
            console.log('No.' + i + this.name); 
            console.log(this.skill[i]); 
            console.log('.........................');
        },0);
        console. 1og(i);
    }
}
};
obj.say();
5. bind
bind 一个经典的api
1:this 
2:返回一个新的函数 函数式编程风格 定义了很多定义函数的规则  柯里化是其中一种 ke'li'hua 经典的编程
实现ES5中function原型的bind方法，是的以下程序最后能输出'success'
function Animal(name, color) {
    this.name= name;
    rhis.color = color;
}
Animal.prototype.say = function () {
    return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.bind(null, 'cat');
const cat = new Cat('White');
if(cat.say() === 'I\'m a white cat' && cat instanceof Cat) {
    console.log('success');
}
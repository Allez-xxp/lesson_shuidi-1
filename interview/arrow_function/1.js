//手写一个new  会分成两个版本
//箭头函数不能new
//普通函数 es6,es5
//一定得用普通函数 才能有this 不能用箭头函数
//es5版本：
//考点： 对于es6的理解
// var New = function(fn, ...args) {
//     const obj = {}; //从空对象开始 或者写成 const obj = new Object();//const obj = Object();
//     obj.__prop__ = fn.prototype; //原型对象要指向
//     fn.call(obj, ...args)  //指定内部的this，指向obj
//     return obj;
// }
// function Func1(name) {
//     this.name = name
// }
// // New(Func1);
// var f1 = new(Func1)
// console.log(f1 instanceof Func1);  //true

//es6的写法 Object.setPrototype
var New = function(fn, ...args) {
    const obj = Object.create(fn.prototype);  //Object.create可以基于一个对象去创建一个新的对象出来
    // Object.create(person);
    fn.call(obj, ...args)  //指定内部的this，指向obj
    return obj;
}
function Func1(name) {
    this.name = name
}
// New(Func1);
var f1 = new(Func1)
console.log(f1 instanceof Func1);  //true
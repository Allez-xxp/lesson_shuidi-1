# 箭头函数很简便，但是功能也被简化了
- this 没有 学习水平 不够的
使用箭头函数 
- 很简约 ，arrow_function 缺了很多东西其实  内部this指向父级
- super 关键字 你能举出应用场景吗？
它是继承关系里的 父类子类关系中的
封装 继承 多态
class Person{
    constructor() {
        super() //表示调用父中的构造函数，使父中的this指向自己，得到父元素中的东西 然后后面面再写其他的自己的东西
        this.
    }
}
super关键字是属于函数的
函数中可以有super 、arguments(参数)  this 都是在函数运行的那一刹那啊，this的指向由函数的运行的方式决定
可以用es6的class关键字来理解，还能用别的可能性让我们的js函数有super的使用吗？
新建index.html

- 对象间继承关系的新方法 Object.setPrototypeOf(childObject,fatherObject)
- 函数中的this arguments super(在函数内部)，调用的时候要作为当前子类的方法被调用
箭头函数中是没有this的 箭头函数的this是因为作用域的查找才有的 没有super关键字 
Uncaught SyntaxError: 'super' keyword unexpected here

Object.setPrototypeOf():
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

1. this 是没有的 只有作用域查找，指向父类的作用域
2. 'super' 关键字的super 箭头函数中用super回报:Uncaught SyntaxError: 'super' keyword unexpected here

- target.html
函数式编程 讶语
3. 箭头函数中不适合用来做构造函数 this指向问题 不是箭头函数可以取代普通函数
在它内部 new.target 也是没有的，被干掉了
- 实例与构造函数间的关系是：

js 一切皆对象 函数也是对象
但是在其他语言中会把函数和对象区分一下
区别是：
对象是有__proto__属性的 用这个实现原型对象
函数是有prototype属性 实现构造类

对象的原型对象是
函数
令：lg 是 Person实例的对象 Person是构造函数
lg.__proto__  //"{{construtor}}"
lg.__proto__ === Person.prototype //lg.__proto__的原型对象 Person.prototype的原型对象
Person.prototype 这是原型对象 Person是构造函数 构造函数与原型对象之间就组成了一个类
一个实例是由Person new出来的
Person.prorotype.constructor //它的构造函数
lg instanseof Person 是Person的一个实例，当他在new的时候，它是从我们的Object()开始的
然后拿去运行 new的时候 内部的this指向的实例，为他添加属性
lg要拿到Person的方法，就
函数跟方法是两码事，函数就是作为普通函数被调用，方法是作为对象的某个方法.method
用lg.__proto__属性来拿到方法，每一个对象都有这个属性，这个属性就指向的是构造函数的原型链对象
所以只要lg指向原型对象就可以直接调用
lg.sayName

 Person.prototype.sayName = function() {
            console.log(`我是${this.name}`)
        }
        let lg = new Person('李广');
        console.log(lg.name);

生成对象时，对象的__proto__属性指向函数的prototype属性

lg.__proto__ ==Persom.prototype  //true
console.log(Person)
4. 构造函数
箭头函数是不可以被new的 因为里面没有this,new了之后对象拿不到属性

Object.create():
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
这个也可以用来实现继承
const me = Object.create(person);

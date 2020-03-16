# this this指向的是调用它的对象
1. js在创建上下文执行的时候就生成了this
2. 创建index.html(浏览器打开)，不是index.js(终端打开)
在非严格模式下，浏览器的指向的是window,严格模式下，浏览器指向的是undefined
在终端node，node的全局指向的是global，不是window,所以要看this的作用域是不是指向window的话，在node的运行环境下是看不出来的,所以创建html文件。
3. 如果一个函数中有this但是他没有被上一级对象调用，那么this指向的就会是window
    var demo = obj.b.fn; 
    demo()
   如果一个函数中有this,他有被上一级对象调用，那么this指向的就会是上一级对象
    obj.b.fn() //指向对象b
   如果一个函数中有this，尽管这个函数是被最外层的对象所调用，this却只会指向其上一级对象
    obj.b.fn()
4. 修改this作用域问题
方法有：call,apply,bind
用bind方法给一个函数进行this作用域的绑定后他就是一个永久性的绑定。会覆盖掉call、apply的指向。
var user2 = {name: '蜗牛小生'}
user1return.call(user2) //已经执行了bind,再让他指到user2中去,但是打印的是仍是{name: "蜗牛"}
5. 如果this和return
如果返回是一个对象，那么this就指向返回的对象，拿不到user属性
function fn() { //这里是一个构造函数，所以我们把它new一个对象出来
    this.user = '蜗牛'
    return {}  //返回一个空对象，空对象也是对象
} 
如果返回的不是对象，this就还是指向原来的函数实例
如果返回的是null,this还是返回的是实例，比较特殊。
6. es6箭头函数中this的指向取决于创建的位置
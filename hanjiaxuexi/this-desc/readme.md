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
new 的规则

函数有返回对象，就返回this 否则返回null
今天 19:47

new之后 会创建一个对象，这个对象会继承prototype

this是指向新创建的对象（this === {}） 看Page 返回一个对象？返回的对象就是new的结果 ： 返回{}

2. js的数据类型有哪些？

Undefined是一个类型，这个类型有一个值，就是undefined

Null是一个类型，只有一个值null

String 用utf-16来编码

Symbol

Number 是用64位来表示的double双精度

NaN是属于Number的一个类型

function Page() {
  console.log(this);
  // 1： create {}
  // 2： {} 继承 自 Page.prototype
 //  3： this === {}
//  4：看 Page 返回一个对象 ？ 返回的对象就是 new 的结果 ： 返回 {}
  return this.hosts;
}
Page.hosts = ['h11111'];
Page.prototype.hosts = ['h22222'];
 
var p1 = new Page();
var p2 = Page();

console.log(p1); 
// console.log(p2);

Infinity 这是Number的

Infinity是无穷，有正无穷和负无穷

还有正0和负0

23/0 = Infinity

Object类型 除了上面的，还有正则 function，其他就是Object了
今天 20:04

3. var name = 'foo'; // name 是全局变量
function showName(myName) {
  // myName 是传入 showName 的局部变量
  console.log(myName);
}
function sayHello() {
  // hello 被定义成局部作用域变量
  var helloString = 'hello everyone';
  console.log(helloString);
}


showName(name)
sayHello();

3.

var name = 'foo';
function showName() {
    console.log(name);
}
function changeName() {
    var name = 'BigBear';
    showName();
}
changeName();
今天 20:08

作用域的查找
慧琳
有两种作用域：
静态作用域（词法作用域）和动态作用域（Bash脚本、Perl等）
静态作用域： 按照代码书写的位置查找上层作用域 不是按照调用的位置来（上面那个就是
作用域：全局作用域 块作用域 函数作用域
作用域链：一层一层往外找
慧琳
4. 欺骗词法作用域
慧琳
eval()
慧琳
把这段字符串变成一段js
慧琳
with也是
慧琳
with(me) {
今天 20:21
慧琳
5. 闭包
你撤回了一条消息
慧琳
本质是当前环境中存在指向父级作用域的引用
慧琳
即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
在代码中引用了自由变量

慧琳
当前上下文保存父级执行上下文中的 AO/VO（红宝书的）
慧琳
6. 私有变量
慧琳
函数式编程中 到处都是闭包
高阶函数 纯函数缓存
7. 纯函数
js/fp-pure-function

闭包是在词法作用域下出来的
# 第一章 关于this
this被自动定义在所有函数的作用域中。
## 1.1为什么要用this
function identify(){
    return this.name.toUpperCase();
}
function speak(){
    var greeting="hello,I'm "+identify.call(this);
    console.log(greeting);
}
var me={
    name:"kyle"
};
var you={
    name:"Reader"
};
identify.call(me);//KYLE
identify.call(you);//READER
speak.call(me);//hello,I'm KYLE
speak.call(you);//hello,I'm READER
如果不用this，那就要显式地传入一个上下文对象：
function identify(context){
    return context.name.toUpperCase();
} 
function speak(context){
    var greeting="hello,I'm "+identify(context);
    console.log(greeting);
}
identify(you);//READER
speak(me);//hello,I'm KYLE
## 1.2 误解 P76
### 1.2.1 指向自身
从函数内部引用函数自身，常见原因：1.递归（从函数内部调用这个函数） 2.写一个在第一次被调用后自己解绑的事件处理器。
创建一个带有count属性的对象，使用了词法作用域。
使用call(...)确保this指向函数对象foo本身。
foo.call(foo,i); P79
然后可以用this.count++
### 1.2.2 它的作用域
第二种常见错误：this指向函数的作用域。this在任何情况下都不指向函数的词法作用域。
使用this来隐式地引用函数的词法作用域：
function foo(){
    var a=2;
    this.bar();
}
function bar(){
    console.log(this.a);
}
foo();//ReferenceError :a is not defined
## 1.3 this到底是什么 P80
this是在运行时进行绑定的，并不是在编写时绑定的。
this的绑定和函数声明的位置没有任何关系，中取决于函数的调用方式。
## 1.4 小结
- this既不指向函数自身，也不指向函数的词法作用域。
- this是在函数被调用时发生绑定，它指向什么完全取决于函数在哪里被调用。

# 第二章 this全面解析
## 2.1 调用位置
调用位置就是函数在代码中被调用的位置，不是被声明的位置。
分析调用栈（就是为了到达当前执行位置所调用的所有函数）。调用位置就在当前正在执行的函数的前一个调用中。
function baz(){
    //当前调用栈是：baz
    //因此，当前调用位置是全局作用域
    console.log("baz");
    bar();//<--bar的调用位置
}
function bar(){
    //当前调用栈是baz->bar
    //因此，当前调用位置在baz中
    console.log("bar");
    foo();//<--foo的调用位置
}
function foo(){
    //当前调用栈是baz->bar->foo
    //因此，当前调用位置在bar中
    console.log("foo");
}
baz();//<--baz的调用位置
## 2.2 绑定规则
函数的执行过程中调用位置如何决定this的绑定对象？
- 先找到调用位置，再判断应用的是四条规则中的哪条。
### 2.2.1 默认绑定 P84
最常用的函数调用类型：独立函数调用。可以看作是无法应用其他规则时的默认规则。
function foo(){
    <!-- "use strict"; 使用严格模式的话就是undefined-->
    console.log(this.a);
}
var a=2;
foo();//2
//this.a被解析为全局变量a,应用了this的默认绑定，因此this指向全局对象。
只有foo()运行在非strict mode下时，默认绑定才能绑定到全局对象。
function foo(){
    console.log(a);
}
var a=2;
(function(){
    "use strict";
    foo();//2
})();
### 2.2.2 隐式绑定
调用位置是否有上下文对象，或者说是否被某个对象拥有或包含
function foo(){
    console.log(a);
}
var obj={
    a:2,
    foo:foo
};
obj.foo();//2
调用位置会使用obj上下文来引用函数，因此可以说函数被调用时obj对象拥有或包含它。
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。因为调用foo()时this被绑定到obj,因此this.a和obj.a是一样的。
- 隐式丢失 P86
被隐式绑定的函数会丢失绑定对象，也就是说他会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。
function foo(){
    console.log(this.a);
}
var obj={
    a:2,
    foo:foo
};
var bar=obj.foo;//函数别名！
var a="opp";//a是全局对象的属性
bar();//"opp"
此时bar()是一个不带任何修饰的函数调用，因此应用了默认绑定。
虽然bar是obj.foo的一个引用，但实际上它引用的是foo函数本身。
传入回调函数时：
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    //fn其实引用的是foo
    fn();//<--调用位置
}
var obj={
    a:2,
    foo:foo
};
var a="opp";//a时全局对象的属性
duFoo(obj.foo);//"opp"
参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值。
- 调用回调函数的函数可能会修改this，回调函数丢失this绑定是非常常见的。
### 2.2.3 显式绑定
隐式绑定是在一个对象内部必须包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）绑定到这个对象上。
不想在对象内部包含函数引用，而想在某个对象上强制调用函数，该怎么做？
可以使用函数的call(...) 和apply(...)方法。
function foo(){
    console.log(this.a);
}
var obj={
    a:2
};
foo.call(obj);//2
通过foo.call(...),在调用foo时强制把它的this绑定到obj上。
解决丢失绑定问题：P88
1. 硬绑定 P89
- 创建一个包裹函数
- 创建一个可以重复使用的辅助函数
function.prototype.bind方法
function foo(something){
    console.log(this.a,something);
    return this.a+something;
}
var obj={
    a:2
};
var bar=foo.bind(obj);
var b=bar(3);//2 3
console.log(b);//5
bind(...)会返回一个硬编码的新函数，它会把你指定的参数设置为this的上下文并调用原始函数。
2. API调用的“上下文” P90
可选参数，通常被称为“上下文”，其作用和bind(...)一样。
function foo(el){
    console.log(el,this.id);
}
var obj={
    id:"awesome"
};
//调用foo(...)时把this绑定到obj
[1,2,3].forEach(foo,obj);
//1 awesome 2 awesome 3 awesome
### 2.2.4 new绑定
在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用new初始化类时会调用类中的构造函数：
something=new MyClass(...);
javascript中的new与之不同。
JavaScript中构造函数只是被new操作符调用的普通函数。
function foo(a){
    this.a=a;
}
var bar=new foo(2);
console.log(bar.a);//2
## 2.3 优先级？？？
new绑定（用硬绑定比较）>显式绑定>隐式绑定
- 判断this
根据优先级判断用的是哪条规则。
## 2.4 绑定例外
### 2.4.1 被忽略的this P96
如果把null或undefined作为this的绑定对象传入call,apply或者bind,这些值在调用是会被忽略，实际应用的是默认绑定规则。
### 2.4.2 间接引用
### 2.4.3 软绑定？
## 2.5 this词法 P100
箭头函数无法使用这些规则，而是根据外层（函数或全局）作用域来决定this。
function foo(){
    return (a)=>{
        //this继承自foo()
        console.log(this.a);
    };
}
var obj1={
    a:2
};
var obj2={
    a:3
};
var bar=foo.call(obj1);
bar.call(obj2);//2,不是3！
箭头函数的绑定无法被修改。
self=this;或箭头函数来否定this机制。
## 2.6 小结
# 第三章 对象
## 3.1 语法 P102
对象可以通过两种形式定义：声明（文字）形式和构造形式。
文字语法：
var myobj={
    key:value
    //...
};
构造形式：
var myobj=new Object();
myobj.key=value;
文字形式和构造形式的唯一区别：在文字声明中可以多添加几个键/值，但在构造形式中你必须逐个添加属性。
## 3.2 类型 
在JavaScript中类型一共有6种（语言类型）：
string
number
boolean
null
undefined
object
注意，简单基本类型本身不是对象。                            
JavaScript中有许多特殊的对象子类型，我们可以称之为复杂基本类型。
函数就是对象的一个子类型（从技术上来说就是“可调用的对象”）。
数组也是对象的一种类型。                                                                        - 内置对象
String
Number
Boolean
Object
Function
Array
Date
RegExp
Error

var strPrimitive="I'm a string";
typeof strPrimitive;//string
strPrimitive instanceof String;//false

var strObject=new String("I'm a string");
typeof strObject;//object
strObject instanceof String;//true

//检查sub-type对象
Object.prototype.toString.call(strObject);//[object String]

strObject是由String构造函数创建的一个对象。
原始值"I'm a string"只是一个字面量，如果要在上面执行一些操作，比如获取长度等，需将其转换为String对象。不过引擎一般会自动转换好。
## 3.3 内容 P105
var myObject={
    a:2
};
myObject.a;//2
myObject["a"];//2
.a是属性访问，["a"]是键访问。实际上访问的是同一个位置。
### 3.3.1 可计算属性名
通过表达式来计算属性名。myObject[...]这种属性访问语法就能用了。
在文字形式中使用[]包裹一个表达式来当作属性名。
var prefix="foo";
var myObject={
    [prefix+"bar"]: "hello",
    [prefix+"baz"]: "world"
};
myObject["foobar"];//hello
myObject["foobaz"];//world
### 3.3.2 属性与方法
函数不会“属于”一个对象——它们只是对于相同函数对象的多个引用。
var myObject={
    foo:function(){
        console.log("foo");
    }
}
var someFoo=myObject.foo();
someFoo;//function foo(){...}
myObject.foo;//function foo(){...}
### 3.3.3 数组
var myArray=["foo",42,"bar"];
myArray.length;//3
myArray[0];//"foo"
myArray[2];//"bar"
可以给数组添加属性：
var myArray=["foo",42,"bar"];
myArray.baz="baz";
myArray.length;//3
myArray.baz;//"baz"
注意：如果添加的属性名“看起来”像一个数字，它会变成数组的下标。
var myArray=["foo",42,"bar"];
myArray["3"]="baz";
myArray.length;//4
myArray[3];//"baz"
### 3.3.4 复制对象 P109
function anotherFunction(){/*..*/}
var anotherObject={
    c:true
};
var anotherArray=[];
var myObject={
    a:2,
    b:anotherObject,//引用，不是复本！
    c:anotherArray,//另一个引用
    d:anotherFunction
};
anotherArray.push(anotherObject,myObject);
如何准确地表示myObject的复制呢？
浅拷贝；深拷贝。
对于JSON安全：
var newObj=JSON.parse(JSON.stringify(someObj));
ES6 object.assign(...)方法实现浅复制。 P110
var newObj=Object.assign({},myObject);
newObj.a;//2
newObj.b===anotherObject;//true
newObj.c===anotherArray;//true
newObj.d===anotherFunction;//true
### 3.3.5 属性描述符
ES5开始，所有的属性都具备了属性描述符。
var myObject={
    a:2
};
Object.getOwnPropertyDescriptor(myObject,"a");
<!-- {
    value:2,
    writable:true, //可写
    enumerable:true,//可枚举
    configurable:true //可配置
} -->
属性描述符只保存一个数据时，也被称为“数据描述符”。
在创建普通属性时属性描述符会使用默认值，我们也可以使用Object.defineProperty(..)来添加一个新属性或者修改一个已有属性（如果他是configurable）并对特性进行设置。
var myObject={};
Object.defineProperty(myObject,"a",{
    value:2,
    writable:true, //可写
    enumerable:true,//可枚举
    configurable:true //可配置
});
myObject.a;//2
1. writable 属性不可变（值）
2. configurable 属性描述符不可变，delete myObject.a删除属性也是无效的
delete只是一个删除对象属性的操作。
3. enumerable
### 3.3.6 不变性
1. 对象常量
结合writable:false和configurable:false(不可修改，重定义或删除)。
2. 禁止扩展
禁止添加新属性，且保留已有属性。使用Object.preventExtensions(...)。
Extensions(..):
var myObject={
    a:2
};
Object.preventExtensions(myObject);
myObject.b=3;
myObject.b;//undefined
3. 密封
Object.seal(..)
4. 冻结
Object.freeze(..)
### 3.3.7 [[Get]]
var myObject={
    a:2
};
myObject.a;//2
不仅只是在myObject中找名字为a的属性，实际上是实现了[[Get]]操作。
根据返回值不好判断是值为undefined还是变量不存在，如何区分呢？
### 3.3.8 [[Put]]
### 3.3.9 Getter和Setter P117
当给一个属性定义getter、setter时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。
对于“访问描述符”，JavaScript会忽略他们的value和writable,关心set,get,configurable,enumerable。
var myObject={
    //给a定义一个getter
    get a(){
        return 2;
    }
};
Object.definedProperty(
    myObject,//目标对象
    "b",//属性名
    {
        //描述符
        //给b设置一个getter
        get:function(){return this.a*2},
        //确保b会出现在对象属性列表中
        enumerable:true
    }
);
myObject.a;//2
myObject.b;//4
只设定了a的getter,对a的值进行设置时set操作会忽略赋值操作，所以应当还定义setter。
var myObject={
    //给a定义一个getter
    get a(){
        return this._a_;
    },
    set a(val){
        this._a_=val*2;
    }
};
myObject.a=2;
myObject.a;//4
### 3.3.10 存在性 P119
根据返回值不好判断是值为undefined还是变量不存在，如何区分呢？
不访问属性值的情况下判断对象中是否存在这个属性：
var myObject={
    a:2
};
("a" in myObject);//true
("b" in myObject);//false
myObject.hasOwnProperty("a");//true
myObject.hasOwnProperty("b");//false
- hasOwnProperty不会检查是否存在在[[Prototype]]原型链中。
  Object.prototype.hasOwnProperty.call(myObject,"a");
  in 检查的是是否存在该属性名，不是属性值。
1. 枚举 P120
Object.keys(myObject);//["a"]
Object.getOwnPropertyNames(myObject);["a","b"]
myObject.propretyIsEnumerable("a");
for(var k in myObject){
    console.log(k,myObject[k]);
}
## 3.4 遍历
var myArray=[1,2,3];
for(var i=0;i< myArray;i++){
    console.log(myArray[i]);
}
//1 2 3
不是在遍历值，是在遍历下标指向值。
forEach(..)遍历数组中所有值并忽略回调函数的返回值。
some(..)一直运行直到回调函数返回false。
every(..)一直运行直到回调函数返回true。
直接遍历值：
var myArray=[1,2,3];
for(var v of myObject){
    console.log(v);
}
//1
//2
//3
Symbol.iterator P123
## 3.5 小结

# 第四章 混合对象“类”
研究类的具体机制之前，先介绍面向类的设计模式：实例化、继承、和（相对）多态。
## 4.1 类理论
面向对象编程强调的是数据和操作数据的行为本质上是互相关联的，因此好的设计就是把数据以及和他相关的行为打包（或者说封装）起来。
多态：父类的通用行为可以被子类用更特殊的行为重写。
### 4.1.1 “类”设计模式
面向对象设计模式比如迭代器模式、观察者模式、工厂模式、单例模式，等等。
过程化编程：代码只包含过程（函数）调用，没有高层的抽象。
函数式编程。
类并不是必须的编程基础，而是一种可选的代码抽象。有的语言会提供过程化和面向类两种语法。
### 4.1.2 JavaScript中的“类”
由于类是一种设计模式，所以可以用一些方法近似实现类的功能。
JavaScript实际上没有类。
## 4.2 类的机制
Stack类，一种“栈”数据结构。Stack类仅仅只是一个抽象的表示，本身不是栈，必须先实例化Stack类然后才能对它进行操作。
### 4.2.1 建造
“类”和“实例”的概念来源于房屋建造。
建筑是蓝图的物理实例，本质上就是对蓝图的复制。
一个类就是一个蓝图。为获得真正可以交互的对象，要先实例化一个东西，这个东西通常被称为实例。有需要时可以在实例上调用方法并访问其所有共有数据属性。
### 4.2.2 构造函数
类实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为构造函数。这个方法的任务就是初始化实例所需要的所有信息（状态）。
class CoolGuy{
    specialTrick=nothing
    CoolGuy(trick){
        specialTrick=trick
    }
    showOff(){
        output("here's my trick:" ,specialTrick)
    }
}
调用类构造函数来生成一个CoolGuy实例：
joe=new CoolGuy("jumping rope")
joe.showOff()//这是我的绝技：“跳绳”
类构造函数属于类，而且通常和类同名。构造函数用new来调。
## 4.3 类的继承
Vehicle,Car,SpeedBoat类
### 4.3.1 多态 P132
Car重写了vehicle的drive()方法调用了inherited:drive()方法，这表明Car可以引用继承来的原始drive()方法。这个技术被称为多态或者虚拟多态。（相对多态）
“相对”只是多态的一个方面，之所以说“相对”是因为我们并不会定义想要访问的绝对继承层次（或者说类），而是使用相对引用“查找上一层”。
可以用super代替inherited,含义是“超类”，表示当前类的父类/祖先类。
ignition()方法定义的多态性取决于你是在哪个类的实例中引用它。
多态并不表示子类和父类有关联，子类得到的只是父类的一份副本。类的继承其实就是复制。
### 4.3.2 多重继承
如果继承多个“父类”父类中有相同的方法，那子类引用的应该是哪个呢？（B:drive()还是C:drive()）?
javascript不提供“多重继承”功能，用别的方法实现多重继承。
## 4.4 混入 P135
### 4.4.1 显式混入
function mixin(sourceObj,targetObj){
    for(var key in sourceObj){
        //只会在不存在的情况下复制
        if(!(key in targetObj)){
            targetObj[key]=sourceObj[key];
        }
    }
    return targetObj;
}
var Vehicle={
    engines:1,
    ignition:function(){
        console.log("Turning on my engine.");
    },
    drive:function(){
        this.ignition();
        console.log("Steering and moving forward!");
    }
};
var Car=mixin(Vehicle,{
    wheels:4,
    drive:function(){
        Vehicle.drive.call(this);
        console.log(
            "Rolling on all " +this.wheels +"wheels!"
        );
    }
});
注意：JavaScript中不存在类，Vehicle和Car都是对象，供我们分别进行复制和粘贴。
1. 再说多态
Vehicle.drive.call(this);显示多态。之前的inherited:drive(),我们称之为相对多态。
如果用Vehicle.drive()，函数调用中的this会被绑定到Vehicle对象而不是Car对象。所以用.call(this)来确保drive在Car的上下文中执行。
不建议使用显式的多态，代码复杂，难维护。
2. 混合复制 P137
mixin(..)的工作原理。
3. 寄生继承
既是显式的又是隐式的。
### 4.4.2 隐式混入？
var Something={
    cool:function(){
        this.greeting="hello";
        this.count=this.count? this.count+1 : 1;
    }
};
Something.cool();
Something.greeting;//"hello"
Something.count;//1

var Another={
    cool:function(){
        //隐式把Something混入Another
        Something.cool.call(this);
    }
};
Another.cool();
Another.greeting;//"hello"
Another.count;//1 (count不是共享状态)
使用了Something.cool.call(this);实际上“借用”了函数Something.cool()并在Another的上下文中调用了它。结果是Something.cool()中的赋值操作都会应用在Anothe对象上而不是Something对象上。
## 4.5 小结

# 第五章 原型 P142
## 5.1 [[prototype]]
是JavaScript对象的内置属性。
对于默认的[[get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[protoype]]链：
var anotherObject={
    a:2
};
//创建一个关联到anotherObject的对象
var myObject=Object.create(anotherObject);
myObject.a;//2
Object.create(anotherObject);会创建一个对象并把这个对象的[[prototype]]关联到指定的对象。
现在myObject对象的[[prototype]]关联到了anotherObject。
var anotherObject={
    a:2
};
//创建一个关联到anotherObject的对象
var myObject=Object.create(anotherObject);
for(var k in myObject){
    console.log("found:"+k);
}
//found:a
("a" in myObject);//true
### 5.1.1 Object.prototype
所有普通的[[prototype]]最终都会指向内置的Object.prototype。
### 5.1.2 属性设置和屏蔽
## 5.2 "类"
### 5.2.1 “类”函数
类似类的行为利用了函数的一种特性：所有的函数默认都会拥有一个名为prototype的共有并且不可枚举的属性。他会指向另一个对象：
function Foo(){
    //...
}
Foo.prototype;//{ }
这个对象通常被称为Foo原型吗，因为我们通过Foo.prototype的属性来访问它。
这个对象是在调用new Foo()时创建的。
function Foo(){
    //...
}
var a=new Foo();
Object.getPrototypeOf(a)===Foo.prototype;//true
- 关于名称
在JavaScript中，我们不会将一个对象“类”复制到另一个对象“实例”，只是将他们关联起来。
原型继承机制。
差异继承：基本原则是在描述对象行为时使用其不同于普通描述的性质。
### 5.2.2 “构造函数” P149
.constructor属性
1. 构造函数还是调用
实际上new会劫持所有普通函数并用构造对象的形式来调用它。
function Nothingspecial(){
    console.log("don't mind me");
}
var a=new NothingSpecial();
//"don't mind me
a;//{}
函数不是构造函数，但是当且仅当使用new时，函数调用会变成“构造函数调用”。
### 5.2.3 技术
function Foo(name){
    this.name=name; 
}
Foo.prototype.myName=function(){
    return this.name;
};
var a=new Foo("a");
var b=new Foo("b");
a.myName();//"a"
b.myName();//"b"
this.name=name; //该每个对象添加.name属性
Foo.prototype.myName=...,会给Foo.prototype对象添加一个属性（函数）。
- 回顾“构造函数” P152
Foo.prototype的.constructor属性只是Foo函数在声明时的默认属性。如果你创建了一个新对象并替换了函数默认的.prototype对象引用，那么新对象并不会自动获得.constructor属性。
function Foo(){..}
Foo.prototype={..};//创建了一个新原型对象
var a1=new Foo();
a1.constructor===Foo;//false
a1.constructor===Object;//true 
修复.constructor属性：
function Foo(){...}
Foo.prototype={...};//创建了一个新原型对象
//需要在Foo.prototype上“修复”丢失的.constructor属性
//新对象属性起到Foo.prototype的作用
//关于defineProperty(..)
Object.defineProperty(Foo.prototype,"constructor",{
    enumerable:false,
    writable:true,
    configurable:true,
    value:Foo //让.construct指向Foo
});
.constructor是不可枚举的，constructor并不表示被构造。
## 5.3 （原型）继承
//Es6之前需要抛弃默认的Bar.prototype
Bar.prototype=Object.create(Foo.prototype);
//ES6之后可以直接修改现有的Bar.prototype
Object.setPrototypeOf(Bar.prototype,Foo.prototype);
- 检查“类”关系
检查一个实例（JavaScript中的对象）的继承祖先（JavaScript中的委托关联）通常被称为内省（或者反射）。
function Foo(){
    //...
}
Foo.prototype.blah=...;
var a=new Foo();
如何通过内省找出a的“祖先”（委托关联）呢？ P156
- a instanceof Foo;//true
    只能处理对象(a)和函数(带.prototype引用的Foo)之间的关系。不能判断两个对象(a,b)之间是否通过[[prototype]]链关联。
    .bind(..)函数生成硬绑定函数是没有.prototype属性的。
- Foo.prototype.isPrototypeOf(a);//true
  表示：在a的整条[[Prototype]]链中是否出现过Foo.prototype?
  b.isPrototypeOf(c);
直接获取一个对象的[[Prototype]]链:
Object.getPrototypeOf(a);
验证一下：
Object.getPrototypeOf(a)===Foo.prototype;//true
有的浏览器会支持这种：P158
a._proto_===Foo.prototype;//true
## 5.4 对象关联
[[prototype]]机制就是存在于对象中的一个内部链接，他会引用其他对象。
### 5.4.1 创建关联
var foo={
    something:(){
        console.log("tell me");
    }
};
var bar=Object.create(foo);
bar.something();//"tell me"
Object.create()的polyfill代码 P160
Object.create时ES5中新增的函数，所以要早在之前的环境中使用要加ployfill代码。
if(!Object.create){
    Object.create=function(o){
        function F(){}
        F.prototype=o;
        return new F();
    };
}
### 5.4.2 关联关系是否备用
内部委托
var anotherObject={
    cool:function(){
        console.log("cool!");
    }
}
var myObject=Object.create(anotherObject);
myObject.doCool=function(){
    this.cool();//内部委托！
}；
myObject.doCool();//"cool!"
## 5.5 小结
对象之间的关系，不是复制，而是委托。

# 第六章 行为委托
## 6.1 面向委托的设计
我们必须认识到[[prototype]]代表的是一种不同于类的设计模式。
试着把思路从类和继承的设计模式转换到委托行为的设计模式。
### 6.1.1 类理论
class Task{
    id;
    //构造函数Task()
    Task(ID){id=ID;}
    outputTask(){output(id);}
}
class XYZ inherits Task{
    label;
    //构造函数
    XYZ(ID,lable){ super(ID); label=label;}
    outputTask(){super();output(label);}
}
class ABC inherits Task{....}
可以实例化子类XYZ的一些副本然后使用这些实例来执行任务“XYZ”。
### 6.1.2 委托理论 P166
用委托行为而不是类来讨论同样的问题。
首先定义一个名为Task的对象（它既不是类也不是函数），它会包含所有任务都可以使用的具体行为。接着对于每个任务（“XYZ”、“ABC”）你都会定义一个对象来存储对应的数据和行为。你会把特定的任务对象都关联到Task功能对象上，让他们在需要的时候你可以进行委托。

基本上可以想象成，执行任务“XYZ”需要两个兄弟对象（XYZ 和Task）协作完成，但是我们并不需要把这些行为放在一起，通过类的复制，我们可以把他们分别放在各自独立的对象中，需要时可以允许XYZ对象委托给Task。
Task={
    setID:function(ID){this.id=ID;},
    outputID:function(){console.log(this.id);}
};
//让XYZ委托Task
XYZ=Object.create(Task);

XYZ.prepareTask=function(ID,Label){
    this.setID(ID);
    this.label=label;
};
XYZ.outputTaskDetails=function(){
    this.outputID();
    console.log(this.label);
};
//ABC=Object.create(Task);
//ABC...=...
在这里Task和XYZ既不是类也不是函数，是对象。XYZ通过Object.create(...)创建，它的[[prototype]]委托了Task对象。
1. 在上面的代码中id,label数据成员都是直接存储在XYZ上（而不是Task）。？
2. 在类模式中我们故意让父类和子类都有outputTask方法，便于重写，在委托行为中恰好相反，会尽量避免在[[prototype]]链的不同级别中使用相同的命名，避免引起歧义。
3. this.set(ID);XYZ中的方法首先会寻找XYZ自身是否有setID (...),没有会通过[[prototype]]委托关联到Task继续寻找，这时就会找到Task里的setID(...)方法，此外由于调用位置触发了this的隐式绑定规则，因此虽然setID(...)方法在Task中，运行时this仍然会绑定到XYZ。
- 1. 互相委托（禁止）
B关联到A，然后试着把A关联到B会出错。
- 2. 调试
### 6.1.3 比较思维模型
比较“类”和“委托”在思维模型上的区别。
典型的“原型”面向对象风格：
function Foo(who){
    this.me=who;
}
Foo.prototype.identify=function(){
    return "i'm " + this.me;
};
function Bar(who){
    Foo.call(this,who);
}
Bar.prototype=Object.create(Foo.prortotype);
Bar.prototype.speak=function(){
    alert("hello," +this.identify() +'.');
};
var b1=new Bar("b1");
var b2=new Bar("b2");
b1.speak();
b2.speak();
用对象关联风格来写：
Foo={
    init:function(who){
        this.me=who;
    },
    identify:function(){
        return "i'm " + this.me;
    }
};
Bar=Object.create(Foo);
Bar.speak=function(){
    alert("hello," +this.identify() +'.');
};
var b1=Object.create(Bar);
b1.init("b1");
var b2=Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();
对象关联风格只关心对象之间的关联关系。
## 6.2 类与对象 ???
### 6.2.1 控件“类”? P174
面向对象设计模式，包含所有通用控件行为的父类(widget)和继承父类的特殊控件子类(Button)。
如何在不使用“类”辅助库或者语法的情况下，使用纯javascript实现类风格的代码呢？
- ES6的class语法糖：
super(..)?
### 6.2.2 委托控件对象 P176
## 6.3 更简洁的设计
- 反类 P181
## 6.4 更好的语法
- 反词法 P184
简洁方法无可避免的缺点：不具备可以自我引用的词法标识符。
var Foo={
    bar(){...},
    baz:function baz(){...}
};
去掉语法糖后
var Foo={
    bar:function(){...},
    baz:functiom baz(){...}
};
自我引用的话函数最好使用具名函数表达式：
baz:function baz(x){
    if(x<10){
        return Foo.baz(x*2);
    }
    return x;
}
## 6.5 内省 P185 P156
自行就是检查实例的类型。类实例自省的主要目的是通过创建方式来判断对象的结构和功能。
使用instanceof(参见第五章P156)来推测对象a1的功能。
function Foo(){
    //...
}
Foo.prototype.something=function(){
    //...
}
var a1=new foo();
//之后
if(a1 instanceof Foo){
    a1.something();
}
因为Foo.prototype（不是Foo!）在a1的[[prototype]]链上，所以instanceof(会令人疑惑地)告诉我们a1是Foo"类"的一个实例。-->a1有Foo“类”描述的功能。
鸭子类型
if(a1.something){
    a1.something();
}
## 6.6 小结

# 附录A ES6中的Class
第二部分可以总结为：类是一种可选的（而不是必须）的设计模式，而且在JavaScript这样的[[prototype]]语言中实现类是很别扭的。
## A.1 class
ES6的class机制
回顾第六章的：
class Widget{
    constructor(width,height){
        this.width=width || 50;
        this.height=height || 50;
        this.$elem=null;
    }
    render($where){
        if(this.$elem){
            this.$elem.css({
                width:this.width+"px",
                height:this.height+"px"
            }).appendTo($where);
        }
    }
}
class Button extends Widget{
    constructor(width,height,label){
        super(width,height);
        this.label=label || "Default";
        this.$elem=$('<button>).text(this.label);
    }
    render($where){
        super($where);
        this.$elem=click(this.onClick.bind(this));
    }
    onClick(evt){
        console.log("Button '" + this.label +"' clicked!");
    }
}
这里用ES6解决了很多问题。
## A.2 class陷阱 P191
class C{
    constructor(){
        this.num=Math.random();
    }
    rand(){
        consolel.log("Random:" + this.num);
    }
}
var c1=new C();
c1.rand();//"Random:0.43242999..."

C.prototype.rand=function(){
    console.log("Random:" + Math.round(this.num*1000));
};
var c2=new C();
c2.rand();//"Random:867"

c1.rand();//"Random:432" !!!!
class语法无法定义类成员属性，只能定义方法。

class C{
    constructor(){
        //确保修改的是共享状态而不是在实例上创建一个屏蔽属性！
        C.prototype.count++;
        //this.count可以通过委托实现我们想要的功能
        console.log("hello:" +this.count);
    }
    //直接向prototype对象上添加一个共享状态
    C.prototype.count=0;

    var c1=new C();
    //hello:1

    var c2=new C();
    //hello:2

    c1.count===2;//true
    c1.count===c2.count;//true
}
但违背了class本意，在实现中暴露了.prototype。
C.prototype.count++;而不是用this.count++,前者可以更新共享状态？
意外屏蔽问题：
class C{
    constructor(id){
        //噢！郁闷，我们的id属性屏蔽了id（）方法
        this.id=id;
    }
    id(){
        console.log("ID:" +id);
    }
}
var c1=new C("c1");
c1.id();//TypeError--c1.id现在是字符串"c1"
super的绑定方法。
super是在声明时（静态）绑定的。
手动绑定toMethod(...) P194
var D={
    foo:function(){
        console.log("D.foo");
    }
};
//把E委托到D
var E=Object.create(D);
//手动把foo的[[HomeObject]]绑定到E，E.[[prototype]]是D，所以super()是D.foo()
E.foo=C.prototype.foo.toMethod(E,"foo");
E.foo();//"D.foo"
toMethod(...) 会复制方法并把homeObject当作第一个参数（也就是我们传入的E），第二个参数（可选）是新方法的名称（默认是原方法名）。
## A3 静态大于动态吗
如果使用.bind(...)函数来硬绑定函数，那么这个函数不会像普通函数那样被ES6的extend扩展到子类中。
## A4 小结

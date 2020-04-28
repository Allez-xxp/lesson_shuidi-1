# 要记住这个思想
# 面向切面编程 java的Spring 里面有一个思想：AOP 
切页面要无侵入的，动态的注入进去

装饰者模式可以实现AOP
AOP的思想就是面向切面编程

IOC 控制反转

# 我要监听数组有没有调用push方法 重要！
什么手段可以达到？
监听push方法就能知道数组有没有变化了
vue中不仅监听对象的变化还要监听数组的变化
hook:
1. 保留一份最初的
2. 重写 会破坏
3. 恢复原本的能力

代理 || hook
XMLHttpRequest 重写也是这三步

- Ajax-hook
拦截ajax中的hook请求

# ES 的装饰器decorator 常与class一起用
@ 一个这个符号 这个的原理就是落在js上的

- class的装饰
class.js

静态属性 是可以直接通过类名 直接访问属性，对立面为 实例属性 ： 只能通过类的实例来访问的属性

装饰-》点缀
代码都是用来实现某个功能的，装饰了，让功能更强大
2.类的装饰，重点在装饰
 isAnimal就是一个方法
 @ 浏览器不支持，装个Babel 配置babelrc配置文件
{   
    // 插件的集合
    "presets": [
      "@babel/preset-env"
    ],
    // 把装饰器语法转成es5
    "plugins": [ //一个个单独的插件
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
  }
  然后装插件
不用在类的内部进行修改，添加一个装饰器 是无侵入的动态的注入
npm run babelCompile

 通过对应的位置拿到
只要对方法装饰，原始的就存在descriptor.value中
const origin = descriptor.value;
就像是原来是：
descriptor.value = function work(){}
然后我们后面直接把这个方法重写了，所以造成了破坏，要恢复
而对于这：
这里的没有对target造成破坏,我们只是挂了一个功能，是新增一个属性，没有重写
    target.isThing = function() {
        console.log('thing');
    }
# react中的HOC 高阶组件


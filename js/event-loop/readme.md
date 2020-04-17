https://html.spec.whatwg.org/multipage/
https://github.com/MengZhaoFly/blog/issues/63
# event Loops是有分类的
whatwg上面规范
浏览器厂商 w3c ECMAscript DOM 选择器 whatwg
event loop是用来协调事件的，以及用户交互（聚焦，滚动，脚本）事件: mousemove mousedown

EventLoops 事件循环 是html上面的规范

协调事件，用户交互，脚本，呈现，网络等

在每个环境下面有几个eventloops
独立线程 web-worker: worker event loop
不同的环境下有不同的eventloop
分类：
- window event loops 打开一个页面就有
会进行一次渲染
- worker event loops
- worklet event loops
## event loops
event loops必须有一个或多个task queue
什么任务，他会产生task?
task的产生可能来自：
- events 不是所有事件都是task
- Parsing(解析)
- ...
每个event loops都有一个当前正在运行的任务
每个event loops都有一个微任务队列(microtask queue)
每个event loops都有一个microtask checkpoint 布尔值（最初为false）规定了一个

## 任务怎么排队的？
队列特性 先进先出
## event loops怎么跑起来？
只要存在事件循环，那必须执行以下步骤：
1. 从task queue取出第一个可以运行的任务然后执行它 把当前执行的任务设为none
2. 遇到microtask queque:
    - 如果event loops的mocrotask checkpoint的值为true 就返回。调度微任务的算法
    - set microtask checkpoint true
    - 只要MTask队列不为空，就要一直运行microtask
    - 执行完了，set checkpoint false
3. update他和rendering

每次从taskQueue取出第一个可执行的任务，执行，如果有microtask queue,那么只要做微任务不为空就一直执行,如果需要，那么会发生一个渲染

performance.now
事件轮循 最近的event loops设置的now的时间。

- 每次一个task
- 所有microtask
- 页面渲染

## 任务的分类
这部分主要分散在各个标准里面：
主要有两个类型，不同类型的任务放在不同的队列中去
microtask:
- process.nextTick  产生的就是微任务
- MutationObserver  
- Promise.then 它的回调，也是为任务

task: === macrotask 宏任务(规范中没有这么说过，规范中只说了task)

- 主代码块     js一进来，可以加载的代码
- setTimeout
- setInterval
- setImmediate

## 渲染
浏览器 60Hz,
frame 一帧需要处理的

电脑中浏览器每秒刷新60帧，每一帧要干什么？（frame图）
matask ===task有的地方会这么写
不是所有事件(event)都是task
鼠标事件和单击事件是task?

rAF: requestAnimationFrame:接受的是一个回调，是根据浏览器一帧的实际来执行的
function render() {
    requestAnimationFrame(render);
}

## 做道题 task.html
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

event-loop这种题最初只有头条出，之后各大互联网公司也开始出

2. async await的参与
就是promise+generater
await就相当于把任务放到promise回调中执行 那他也相当于一个微任务
async function async1() {
 console.log('async1 start');
 await async2();
 console.log('async1 end');
}
async function async2() {
 console.log('async2');
}
console.log('script start');
setTimeout(function () {
 console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
 console.log('promise1');
 resolve();
})
.then(function () {
 console.log('promise2');
});
console.log('script end');
// async await = 把这个任务放到 promise 的回调里面去
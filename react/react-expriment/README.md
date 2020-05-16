concurrent模式 https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html
react生命周期 https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## 渲染进程
fiber 重要！
- js
- UI渲染
这两个是互斥的，js执行，ui就停 因为会影响到，先等js更新完了，ui在渲染
所以这里就有点问题了，js其实感觉有点霸道，是不是会一直抢占执行权，一直执行，ui永远得不到更新
写个test.html

60fps的概念
帧的时候讲过那个图
事件轮循，每一帧要干什么 宏任务 微任务 渲染什么的
一秒刷新60次，屏幕的刷新
每帧大概是16.666ms
每一帧中还包含js的执行，如果js占了很多时间 layout和paint的事件就很少，肯定不够，没有多余的时候给浏览器绘制了，掉帧，有几帧绘制不上去，就会卡顿，打游戏卡帧就是这个

所有的落脚点都在：js执行的时间太长了 影响用户的交互的交互得不到及时的反馈，卡

react就要解决这个 提出fiber架构
解决的思路：让js可以中断（暂停终止或中断）“Render 阶段” 纯净且不包含副作用。可能会被 React 暂停，中止或重新启动。

页面更新后。如果当前帧还有时间就执行js
frame:
exents -> macro -> micro -> rAF ->Layout ->Paint -> rIC(就是这个)
requestIdleCallback检测一帧中有没有剩余时间

concurrent就跟fiber有关
把长任务暂停终止或重新启动
有的叫时间分片或时间片，分到每一帧中，

## 开始
市实验性的版本，把react-dom先删了它是正式版本，我们的concurrent是实验性的
cnpm i react-dom@experimental -S
react默认会以不是concurrent的形式进行渲染，怎么让它用concurrent进行渲染？ 
一个方法
index.js
unstable_createRoot()
react的非正式版的前面都会加一个unstable

排小格子，每个小格子都加值，再加一个动画，回左右摆动

开发一个组件 src/concurrentDemo.jsx
ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />)
开启Concurrent了

didmount中启动一个定时器 ConcurrentDemo.jsx
// concurrent mode模式下，更新频率远远低于100ms
// 这就是concurrent的优化保证了动画的流畅，动画的有限执行，执行动画后还有剩余时间，才继续执行js，动画优先
// 尽管写100，但是还是会往后推迟，react内部的优化方案
如果不开启concurrent 改一下index.js的渲染方式
数字确实是100ms一次，

react 所有的页面渲染，动画
- 交互 绑定的事件 onChange什么的
- js
- 内部 setState
- dom diff
会对这些任务做一个优先级的排比
高优先级的先执行，时间不够就终止（一秒60帧，一帧大约16.66ms,一帧要做的事情）

requestIdleCallback 一帧中有剩余事件才会执行

## 合作调度
以前：js很霸道 我想执行多久就多久
Cooperative Scheduling： js和浏览器站在用户的角度，互相合作 js就执行一点时间，然后让页面渲染，有剩余时间在执行剩余js 都不霸道
requestIdCallback

# 提问 import 怎么在浏览器运行，被babel编译后长什么样？

preset就是一个套餐
plugin就是一个插件 单独插件
@babel/preset-env包含es6->es5的代码 比如tranform-arrow-function transform-let transform-const等一堆，是一个套餐

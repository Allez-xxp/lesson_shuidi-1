ipc 进程间通信
之前的electron_control中
分成两部分：1. renderer渲染进程，背后用electron架构决定的，2.main目录，主进程，跟nativeapi进行交流，把electron走向桌面端开发。

# ipc调试功能
npm init -y
去到package.json
```js
"devDependencies": {
    "devtron": "^1.4.0",
    "electron": "^4.0.1",
    "electron-reload": "^1.4.0"
  },
```
手动添加一下依赖，electron不像react和vue,更新的不是很快，所以用它的最新版本的时候，会有比较多的坑，有些支持没跟上。我们这里指定electron的版本
electron的devTools:dectron electron的调试工具，
cnpm i
装一下他们

新建index.html
这个是我们的renderer。
做一个简单的分层，不做复杂的。
js中用electron可以向native APP发送请求
页面中不用require,node中用require，因为它使用的是commonjs规范。
html运行在chromium中，以文件的方式来运行的
之前用的react,在3000端口上
我们这里等会用api 用的不是loagURL，而是loadFile
把当前html文件作为加载文件的方式加载，所以我们这里的运行环境不是纯前端环境，是node环境。

新建index.js
这个对应的就是我们的主进程，就是ipc这一块
ipcMain(主进程) ipcRenderer(渲染进程)
主进程放跟api相关的东西，渲染进程负责界面UI方面的开发
他们之间相互通信就通过ipcRender和ipcMain，他们可以有信息的交流。
浏览器有多进程，子进程与其他进程交互时可以通过事件的方式来相互通知，当我们使用网络进程，把一个文件下到端口中的时候，他会通知主进程去唤起GPU进程去相应的地方去那相应的内容，进行页面的绘制，然后又是DOM树的渲染过程。CSSOM树的渲染过程，以及最后的页面的渲染过程。重绘重排等
file的双斜杠协议
操作系统中打开一个文件使用的协议
file://
我们使用FTP在上传的时候也会涉及到它。

去package.json
改一下脚本
    "start": "electron ."
npm run start运行一下
使用ctrl + R可以重新刷新页面
打开终端：
view/toggle developer Tools

在index.jsBrowserWindow加一个声明
新版本有时候对require支持的不是太好，因为他要穿过各种各样的环境去支持代码的运行
```js
webPreferences: {
    nodeIntegration: true //把node植入进去，就能用require了
}
```
Integration 一体化
在运行一次 可以调试页面了。
electron中有一个专有调试
在console输入require会出来一个函数
出不来的话就说明刚才的配置没有生效。
因为这里就是处于node的integration中，所以require看起来好像在前端也能运行，但是其这里是node可以被整合运行的地方。
electron是可以将node + chromium + 第三方api糅合进去的一个

然后require('devtron').install();
这是devtron官方的npm中说的使用方法
因为electron中的网页是内置在chromium中的，他可以用这种方式为我们添加devtron这样一个调试面板
```js
require('devtron').install();
D:\LESSION_SHUIDI\electron\learn-ipc\node_modules\_devtron@1.4.0@devtron\api.js:5 Installing Devtron from D:\LESSION_SHUIDI\electron\learn-ipc\node_modules\_devtron@1.4.0@devtron
"devtron"
```
会更vue devtool的vuex的面板一样，会多一些功能，他们之间的通信会被记录下来
require Graph //加载的图
event Liateners //事件监听
ipc //进程间通信
link
accessibility
about
虽然electron能很好的解决兼容性问题，但是有时候，对于mac和window还要分开系统去写些兼容性代码。
mac中用win.webContents.openDevTools();可以

devtron electron中的开发工具，想象成vuex：有actions和mutations
devtron可以帮我们记录下来通信的一个过程，

来到index.html
现在由renderer向main发送请求
```js
var events = require('events');
console.log(ipcRenderer instanceof events.EventEmitter, '-------')

// 向main发送请求
ipcRenderer.send('greet', {
    message: 'hello main ~'
})
```
为什么ipcRenderer中可以由send方法？
要了解什么叫eventEmitter
在node.js中koa express都是从一个eventEmit开始的，就是继承自这个对象，这个对象来自events模块
ipcRenderer是他的一个实例
什么是eventsEmit
它是node中异步事件循化机制中node的实现，就在node中它的异步事件，事件的监听就是通过eventEmit对象来实现的。
比如node代码一上去是:
createServer on listen这个api
它的底层就是node中有一个node的异步事件循环队列，在node中是通过eventEmit实现的，
所以像koa的源码，node的一些对象的实现 数据的上传等，背后都是eventEmitter
eventEmitter中它本身有一个send方法，所以它的孩子就会有。
这是node服务器端基于事件编程的一个原生实现。
- 一点点koa
装一下koa 
cnpm i koa
1. 订阅发布者模式，设计模式
前端响应式编程也使用了这个模式，koa也使用了。
2. MVVM defineProperty proxy
3. 手写一个eventEmitter 他就是订阅发布者模式在node中的实现

index.js
ipcmain也是eventEmitter的一个实例
main运行的时候直接在命令行输出
```js
ipcMain.on('greet', (event, args) => {
    // 时间名如果是greet的时候,
    console.log(args);
})
```

+ 在桌面端的开发中单线程的总会有问题
因为桌面端有很多处理，桌面端开发比web端的更复杂，他要处理各种各样的问题，系统 用户 服务端
所以有ipcmian 进程分两部分，一个是跟nativeApi，一个是渲染，他们之间要有一个消息机制，使用eventEmitter
electron是多进程架构技术栈

index.js->index.html
需要重启一下

## 打开electron_control
npm run start
npm run start:main


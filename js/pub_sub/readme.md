- 事件监听 执行逻辑？index.html文件
  浏览器是上网的代理器 chrome.exe 进程
  js 是chrome里的语言编译器来执行的
  html + css DOM树，树，数据结构
  js执行：同步执行，快速
  js执行作为脚本会立刻执行，而addListener是异步的事件
  - 注册事件，到哪注册？
  函数
  - 当事件发生时是怎么执行的？
  js是个单线程语言 onload
  轮循注册事件的地方

  订阅，发布者模式

  房 楼房 是个发布者，发布有房卖的信息
  买房者 ->订阅者
  建模 fang.html文件

  - listen 可以监听，可以添加订阅者
    实现saleOffice.clientList.push(fn);
    - saleOffice对象(发布者，未来有个消息要发布)，加订阅者形成订阅关系
      trigger 有事要通知，未来通知的具体事情，要通知给每个clientList里的人的

      监听，形成订阅关系saleOffices.listen
      当trigger是把所有的订阅者都执行一遍
      - apply 函数出运行外，指定函数运行时内部的this 指向arguments

      - document.body.addEventListener('click',fn);
        document.body是发布者，因为document.body是可以有订阅者的
        订阅者 fn当产生订阅时会放进document.body.events=[]中
        当真正点到页面时会click->
        trigger
            event.each(fn)
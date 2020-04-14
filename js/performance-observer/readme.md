# 前端页面性能监测
一个应用从开发到上线有什么流程
上线后出bug怎么办？等着用户反馈bug吗？
如果用户反馈，那已经发生好几分钟了，意味着损失很多钱了
如何比用户更早知道自己的代码出bug了？就能立即弥补了
这是开发中的一个阶段-》监测线上的产品的检测
所以产品上线之后，要加监测，如果出现了bug，要通知的
现在已有的产品：
FunDebug
或者自己造 比如贝壳找房，就是自己造轮子 架构师做的
靠什么手段监测呢？ 是有api的
performanse-observer
找个图片：https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2473690265,2444464417&fm=26&gp=0.jpg

meituan.com  =>  https://honghe.meituan.com/ 
重定向http://pic.meituan.com   =>  https://pic.meituan.com
![Image text]()
## 重点要记得：w3c上有这张图
https://www.w3.org/TR/navigation-timing-2/
 - resource 包含在
 - paint:
    - FP
    - FCP
    - FMP
- navigation :输入url->看到页面
    - domComplete: DOM解构生成完毕的事件 （html已经渲染完毕）（晚）
    - **domContentLoadedEventEnd: 网页需要执行的的脚本执行完成时间**
    - **domContentLoadedEventStart: domContentLoaded事件发生的时间**
    - domInteractive dom树创建完成的时间（浏览器渲染的时候有一个生成DOM树的一个阶段）（html渲染的时候）（早）
    - **loadEventStart:load时间点**
    这两个要注意 是不一样的：
    - load: The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images
    - domContentLoaded: DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载
    console.log('TCP 耗时',entry.connectEnd - entry.connectStart) //我们这个网页 别人输入url的tcp耗时
    console.log('DOM 解析耗时', entry.domInteractive - entry.responseEnd)//DOM解析耗时 响应结束就开始计时
    console.log('页面完全加载耗时', entry.loadEventStart - entry.fetchStart) //fetchStart页面开始加载的时候 loadEventStart就是onload事件开始执行的时候拿到的时间点 loadEventEnd执行结束的时候
- longtask:长任务 
任何超过50毫秒的任务都算长任务 longtask只有chrome支持
- mark 标记
- measure 测量 在每个点之间测量一下时间
这两个配合起来用一般
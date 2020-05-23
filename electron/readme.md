# 以钉钉为例
如果用electron来做，还需要添加哪些技术栈
根据钉钉中的核心功能来分析，
用electron的好处：节省代码，只需要写一个版本，window中mac中，electron能快速将桌面开发扩容到其他平台上去，进行兼容，所以mac不止用来做开发，也能用来办公，因为有electron。
1. 钉钉中的功能
- 即时通讯 语音，视频计实通讯
在前端有哪个技能是有这个功能的？
即时通讯不是传统的http协议能做的，因为http是无状态的，每次传输后都会断开，虽然http1.1可以复用，但是他自身仍是无状态的。
所以即时通讯要到更底层TCP中去。websocket

阮一峰的websocket教程： http://www.ruanyifeng.com/blog/2017/05/websocket.html
WebSocket 是一种网络通信协议，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。
它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
WebSocket 客户端的 API 如下：
WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。
var ws = new WebSocket('ws://localhost:8080');
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

要做钉钉简版，需要在应用中使用websocket
老师视频能传到学生端，这个通信的关系，websocket传输协议定义了这样一个传输机制，服务端发送，客户端接受，一个学生发送，课程中所有人都能接受到，这个是eventEmit的概念就是可以订阅一个组织的信息，也可以向这个组织发布信息，这个就是websocket,他跟http不太一样。
- webRTC 直播类的
WebRTC，即Web Real-Time Communication，web实时通信技术。简单地说就是在web浏览器里面引入实时通信，包括音视频通话等。
https://www.cnblogs.com/SingleCat/p/11315349.html
因为视频比较大，视频的质量，视频的降噪，在视频中的互动催生直播。
webRTC可以比较方便的跟electron结合，可以做桌面版的视频教学的项目，用webRTC就可以，可以快速实现直播功能。小程序

- redis 点赞的时候有时候会出问题，这是缓存出了问题，
钉钉点赞的数据不是放在数据库中的，不然，独写就太频繁了，所以缓存的数据一般是放在redis内存数据库中。
装一下redis的数据库
全站能力
- 钉钉中要用到消息队列
js是一个单线程应用，如果有需要耗时的，可以通过消息队列去处理。
比如钉钉中有一个功能：已读过，发一条消息，他会统计有多少个人读了，有多少人没读
现在在微信群中有一个功能：群公告，他跟正常的流程是不干预的，所以可以把这部分功能，就好像js的异步处理一样，等到他做完了之后再来回调主线程，有利于提升整体的性能。
前端 kafka:分布式消息系统
链接：https://www.jianshu.com/p/734cf729d77b

它的最大的特性就是可以实时的处理大量数据以满足各种需求场景：比如基于hadoop的批处理系统、低延迟的实时系统、storm/Spark流式处理引擎，web/nginx日志、访问日志，消息服务等等，用scala语言编写，Linkedin于2010年贡献给了Apache基金会并成为顶级开源 项目。
超出前端范畴
- k8s去进行docker的编排
https://www.kubernetes.org.cn/k8s
Kubernetes是一个开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。
Docker 作为高级容器引擎

+ 微信的electron版本
https://github.com/geeeeeeeeek/electronic-wechat

# electron
聊聊什么是ipc
新建一个项目 learn-ipc
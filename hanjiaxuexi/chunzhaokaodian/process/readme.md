ikoala的文章
## 深入理解Node.js中的进程与线程
- 前端角度 来看待进程与线程（js是个单线程语言）
- node 进程 子进程 cluster 多核cpu的利用 GO是天生的云计算时代多核计算语言
- pm2 是线上node运行的管理程序，运行进程管理
- 然后来到容器化时代 docker 能打包进一个容器中
- k8s 容器编排技术 

1. 从前端角度开始
问题：1.Node.js是单线程吗？->js是运行在服务器端的
答：不是。
js是单线程语言，但是因为我们每天写的都是html,css,js,.vue,.jsx文件(前端)，node,koa(服务器端)
java 主线程，子线程...开辟新的线程
但是js在整个web前端领域就这一门语言，因为它基于事件机制event loop再加上回调以及es6的promise，await，async,从另一个角度解决没有多线程多进程的能力问题。
那么怎么解释Node.js不是单线程的呢？源头从何而来呢？转战ajax.html

2. node 端当前的main.js运行起来之后，他就启动了一 个进程，process是进程的一个对象代表，就是进程，进程有一个进程号pid,由操作系统提供，来标配资源分配的最小单元。服务器端天生就是多线程的，因为它不只为一个人服务，服务器端天生是分布式的。
JS在服务器端执行，他也是单线程的，再在根目录下启动live-server
ajax?微软公司法发明的本质上是js对象，本身也是单线程对象，但是是由新的线程创建出来的。
JS是单线程的，但是JS所在的宿主（浏览器），了解容器的概念是对多进程的概念可以实现http的并发，多线程，ajax注册在了主线程event事件里，线程之间可以相互通信。
node是服务器端js执行的容器，node是多进程的，多线程的，node底层仍然应该通过异步实现IO的读写操作，网络操作，文件操作，高性能，高并发。

3. js语言是单线程，但运行所在的容器 浏览器是多进程，多线程的。
node.js 它的容器是node。js语言虽然是单线程的，但是它有异步无阻塞功能。所以它更加适合于高并发。
聊聊创建进程、线程。新建child_process

- 进程的两种方式
child_process
cluster
它们的api都是fork
都是为了提升运行效率，更好的利用cpu
类似nginx做的工作，在负载均衡里面？
进程是独立的，进程之间是不能通信的，除非进程与进程通过ipc（Internet process connection)通信

# 前端监控之数据采集
之前的performanceabsolve是性能监控
贝壳找房开源的fee(灯塔)系统 有一个异常监控性能
资源异常 ajax-hook监控

# js的错误监控
错误监控
小型的监控系统能不能做？ 采集日志，数据等结合后端 设计一个sdk api层监控所有的前端系统还要能暴露给别人看到
js-datacollect-capture.js
# 监控错误日志，
err的监控，有两种
## 一种是try catch
怀疑会有错的代码，先包一下
错误监控的一种方式，他只能捕获同步的错误，异步的就不行

各公司前端技术栈选型 · 语雀:
https://www.yuque.com/zaotalk/team/st#6edd

to c =>面向用户的 custom 比如美团
to B =>面向商户的 business 美团收银机 给商家用的 面向商家的

github这个平台本身是个开源平台，但是GitHub本身这个平台是不开源的，就是github这个网站是怎么做出来的这个代码是不开源的，不过github里面的东西是开源的
gitLab是开源的

try-catch方式有错的代码已经捕获了，所以后面的还是能执行的

因为错误事件他也是一个事件（event),事件都有一个特点的-》冒泡和捕获

## 异步的错误
第一种是捕获意料之中的错，意料之外的要做一个全局捕获
错误监控的难点在于数据的整理，错误是要发送到服务端的，服务端是要把数据存起来的，
难点在于假设流量很大的时候，页面一天可能会被10000个用户打开，假设这一天，页面报错了，后端（服务端）就会收到10000条数据，这对后端是很有考验的，

全局捕获，在window上捕获
错误事件是有一个特点的=》事件共有的特点：冒泡和捕获
https://camo.githubusercontent.com/8ffb9d80008873c4f83156c1ace346f353d9c9fb/68747470733a2f2f7777772e77332e6f72672f54522f444f4d2d4c6576656c2d332d4576656e74732f696d616765732f6576656e74666c6f772e737667

## 冒泡和捕获
事件模型（事件流） --》事件冒泡，事件捕获，事件委托
ECMA：规定的是js的语法 规定词法，语法，语句，表达式之类的
DOM：规定html元素类型，事件等，都是DOM中有规范的
事件是DOM中的很重要的一部分！！
DOM这个模型规定事件的模型必须包括：冒泡 捕获 （有的地方叫做事件流有的地方叫事件模型）
事件流提出一定要有这三个步骤：
事件有三个阶段捕获阶段-》目标阶段（target）-》冒泡阶段（bubbing phase)

1. 捕获 capture phase
2. 冒泡
事件冒泡和事件捕获分别由网景公式和微软公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。事件捕获和冒泡是现在浏览器的执行事件的不同阶段，事件委托是利用冒泡阶段的运行机制来实现的
事件委托是充分利用到了事件会冒泡（第三个阶段）这样的特点

我们平常用的是target阶段，就是事件到达了这个节点，就是在某个节点上绑定的事件，比如：
dom.addEventListener('click',()=>{})

完整的时间流：
捕获-》目标-》冒泡
浏览器的开发团队会认为点击了一个节点就是点击了页面
就是比如点击了div这个节点，不仅是点击了这个节点，也作用在了整个网页上面

捕获阶段capture
因为有些事件是不支持冒泡的，所以我们只能在捕获阶段捕获事件
通过addEventerListener()的第三个参数来设置事件是通过捕获阶段注册的（true）,还是冒泡阶段注册的（false）,默认情况下是false。
事件流：https://www.jianshu.com/p/30d6b4258508

## 第三种Promise
promise有三个状态：pending；resolve；reject
rejest状态
// 因为Promise使用另一个来捕获的：
window.addEventListener('unhandledrejection',function(err){
    console.log(err); //PromiseRejectionEvent {}这个就是Promise的错误
})

node中也是try catch
不过node中的window这个全局对象会换成process
process.on('catchException') catchException
process.on('handledrejection') handledrejection

fundebug也是用这三种方式捕获错误

# api中会出的错
监听api请求会出的错误
XMLHttpRequest的一个用法：
var xhr = new XMLHttpRequest();
  //设置xhr请求的超时时间
  xhr.timeout = 3000;
  //设置响应返回的数据格式
  xhr.responseType = "text";
  //创建一个 post 请求，采用异步
  xhr.open('POST', '/server', true);
  //注册相关事件回调处理函数
  //三个基本的用法：
  <!-- readyStateChange和onload功能一样请求成功了是调用这两个 -->
  xhr.onload = function(e) { 
    if(this.status == 200||this.status == 304){
        alert(this.responseText);
    }
  };
  xhr.ontimeout = function(e) { ... };
  <!-- 请求失败是调用onerror -->
  xhr.onerror = function(e) { ... };
  xhr.upload.onprogress = function(e) { ... };
  
  //发送数据
  xhr.send(formData);

无论怎么样，是什么库，落脚点都是我们原生的api 是这三个方法
axios监听的就是这些api，我们要改的就是这些 改的策略就是那三步 存本+重写+恢复
原来使用xhr.onerror = function(){},这里我们用addEventListener
用on只能绑定一个事件，这可能会覆盖别人的事件，或者别人把你的事件覆盖了
用addEventListener是能绑定多个事件的

readyState是xhr的状态
if(xhr.readyState === 4) {}
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
0	UNSENT	代理被创建，但尚未调用 open() 方法。
1	OPENED	open() 方法已经被调用。
2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
3	LOADING	下载中； responseText 属性已经包含部分数据。
4	DONE	下载操作已完成。

# 静态资源引入的出错
图片引入的出错

js 错误是在冒泡这个阶段监听到的，资源加载的出错，
记住静态资源的加载是在捕获阶段的


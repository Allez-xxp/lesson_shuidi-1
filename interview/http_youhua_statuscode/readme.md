- 当在网页上输入
http://www.baidu.com 发生了什么
不从网络上讲
状态码
请求页面后怎么有状态码出来了？
输入百度的网址，会涉及状态码，通过什么样的方式可以调试出来
304
为什么输入百度的域名就能直接跳转？
因为已经全栈启用了https，https更安全 http不够安全，在网络传输过程中可能会被劫持
301永久性跳转 比如http://www.baidu.com 就要跳转到 https://www.baidu.com,协议不同，就要跳转到一个更加安全的协议上。
302是临时性的跳转 忽略头部请求，直接转为get，解决常见问题，get跳转
304
307是临时重定向，302跳转有一个bug,如果是get没关系，但是如果有post,或者有其他的请求方法的请求地址，他就会降级为get,307不会从 POST 变为 GET
做全栈的时候，有api,需要用到post，表单提交,所以不能用302，不能降级为get,尊重methods字段，不忽略。

- 百度在前端性能优化安全性问题
## 性能优化和安全
- 点击一个a标签，不跳转怎么做？
void_a文件
用prevent，或者204状态码
```js
 var a=document.getElementById("a_id");
a.onclick=function(e){
//do something for myself
e.preventDefault();
//or
stopDefault();
}
```
- 三次握手
seq x
ack
                      ack = x + 1  //表示接受到了seq
                      seq = y  //表示能发送
(接受到传过来的seq)
ack = y+1             //发送到这边
有了三次握手，这个链接就是安全可靠有序的。

response.writeHead(statusCode[, statusMessage][, headers])
发送一个响应头给请求。 状态码是一个三位数的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 第二个参数 statusMessage 是可选的状态描述。

## 状态码
### 1xx 目前正常，告诉客户端可以继续发送请求或忽略这个响应 
101 Switching Protocol 服务端接受切换协议的要求，可以将http 升级为websocket 使用
### 2xx
204 是成功的，但是没有返回，没有body
205 服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。该响应主要是被用于接受用户输入后，立即重置表单，以便用户能够轻松地开始另一次输入。
应用场景：表单不要多次提交
当前提交成功了，表单的提交，可以让它立马跳到另一个页面，避免多次提交。规避重复提交表单。
206 分段 部分内容 服务器已经成功处理了部分 GET 请求。HTTP 分块下载和断点续传，实现断点续传或者将一个大文档分解为多个下载段同时下载，用于大文件上传，或者多文件上传
### 3xx 要跳转
301 永久跳转 http->https 比如有一个域名废弃了，但是老用户从老域名出来，
302 临时跳转
304 not modified 内容没有修改
一般在头部用if-modified-since来表示在客户端已经有了，不用再去服务端取，直接用本地的缓存就行
last-modified跟if-modified一样，就是没有修改
+ 在我们的响应头中有一个Last-Modified和if-modified-since,这两个一样的时候，服务器端就会发送一个304，在这个时间中没有内容修改
+ Cache-Control:max-age=0 //文件缓存 是服务器端的响应头里面带来的吗，
max-age>0 直接从浏览器缓存中提取 
max-age<0 像server发送http请求确认，该资源时候有修改，有的话返回200，没有返回304（这也是304的一个应用场景）
两步：
1. 检查本地缓存 先把缓存中的在页面显示，
2. 去服务器端发送请求 去确认 
跟服务器端的max-age一起用
### 4xx 客户端有问题
400 Bad Request 这是报文存在错误
403 请求被拒绝 就是不应该请求这个东西
404 没有发现文件、查询或URl 
405 Method Not Allowed //用户在Request-Line字段定义的方法不允许
408 Request Timeout
409 多个请求冲突
413 请求体数据过大
414 请求中的url太长
429 客户端发送太多的请求
431 请求头的字段内容太大
### 5xx 
500 Internal Server Error 服务器端出错 但是不知道哪里错了 服务器产生内部错误 有时候跨域问题会出现
501 Not Implemented 服务端不支持客户端的请求方式
502 Bad Gateway服务器端响应是正常的，但是访问的时候出错了 服务器暂时不可用，有时是为了防止发生系统过载 
503 服务现在不可用 Bad Gateway 服务器忙 404是没找到
https://blog.csdn.net/u013381651/article/details/51261956


## 性能优化问题，重绘，重排
performance，点击刷新

## js的优化，我们可以做什么？
eval/post.json
```js
[
    {
      "title": "JavaScript eval() 函数的用法以及危害",
      "id": 1234567890
    },
    {
      "title": "php eval函数用法 PHP中eval()函数小技巧",
      "id": 2345234212
    }
]
```
ajax中xmlhttp.readyState==4 && xmlhttp.status==200是什么意思 麻烦说详细点
https://zhidao.baidu.com/question/362255405993766692.html

eval with都不要用
eval可以把任何的js文本运行起来（什么代码都会被作为json执行起来），就像一个黑科技，他特别耗性能，所以不要用，而且有安全问题，会造成xss攻击(跨站脚本漏洞)
cookie中可能有用户的身份信息，如果遭受了eval文本变成 js执行了， 用document.cookie能拿到，把我们的cookie 用jsonp跨域访问，访问黑客的url，发给他自己的服务器，然后就能用这个cookie了,伪装代表用户发送请求，下单什么的
安全问题：
xss 用户如果存的是个文本，里面存的是js代码，首先拿到用户的cookie,交给ajax(用jsonp的方式)，访问黑客的url,把cookie字符串化，拿到cookie

解决方案是什么？
前后端转义，httpOnly, CSP cookie中有一个httpOnly属性 一些核心的cookie加上这个属性，只有在http协议中，这个cookie才可以被解析，比如服务器端可以，但是前端不可以操作这个cookie，只有能在http中传输，但是前端修改它。
可以为网站的cookie加一个httpOnly属性
只有在http服务中 使用
前端不能修改它

- 用户输入，用eval或者json.parse进行前后端转义，encodeURIComponent 如果加了script标签什么的都会被转码

2. 传统的，加载的顺序
js文件要从下载开始放在尾部，因为会有阻塞问题
- 首先head放css 
html下载完后生成一棵DOM树，再用css，所以要先下载，然后生成一棵cssDOM树，cssRender(css渲染树)，然后就能看到页面了。
- js文件放最下面，因为js文件会阻塞，为什么？
在js比较早的时候，在script后面加一个defer属性或者async属性,script标签就不会阻塞，但是现在不用这个了
为什么要让他阻塞？
下载，放在body尾部 阻塞
- 为什么会阻塞，为什么要设计成阻塞的？ 因为里面可能有动态的东西
因为js中是动态的代码，有可能要动态增加，动态操作DOM，script标签里面可以驱动很多 css/html/...
要等它下载并且执行完毕之后才可以往下，所以必须放下面
css放前面，因为想尽快看到页面，所以要尽快把文件下载下来，然后渲染

css中有一个技巧叫做雪碧图，现在还有必要么？
什么是css雪碧图？
是网页性能的一个使用，把一个网站常用的icon，背景图等放一张图上，好处：只发送一次http请求，可以降低网络传输的性能
缺点：第一次下载的时候有点慢，因为文件比较大，每次要分割（每次请求的数据是有限的） 文件下载完了才能用，要确认，
底层：
为什么不用了？
不好维护，css难写，要写backage-position

直接用阿里的iconfont了，为什么这个不会影响性能？
用这个理解一下：为什么背景图直接img src="" ？
1. 阿里的iconfont可以用到cdn缓存，这个请求是静态文件，很快的 会部署到缓存上，有字体库 能直接用，只要有一个人访问到了，其他人就能共享
阿里会在各个厂商尽量部署cdn集群，加机器，把要用到的图片放到cdn上去 静态服务器，解析的时候就会解析到离我们最近的一台静态服务器
域名解析是递归查找的，有缓存就可以直接用了

img src=""增加了http请求， 这里面没有http请求，直接被webpack打包成了base64，是直接在了js文件中了，是没有请求的
如果有请求，那就是http协议更新了 对他的支持，哪个http版本把雪碧图干掉了？
http有0.9 1.0 1.1 2.0 3.0 目前正在广泛使用的是1.1
小册：浏览器工作原理与实践 极客时间
2.0的时候，就不用雪碧图了，因为都可以并行了
js动画优化
request
0.9版本，加了对超文本的处理，有三次握手，只有请求行，没有请求body,只是支持简单的超文本传输协议 1991年 最简单的请求应答
1.0版本 多文件传输
满足了一个核心需求，支持多种类型的的文件下载，开始有了文件头，请求头，对方就知道怎么处理这个东西，返回了相应的内容后也知道了怎么显示这个内容，浏览器显示一张图片是要给头的，不然只会把他当成文本处理，因为在网络中传输的是字节流，因为网络有7层 物理层-》数据链路层-》ip->TCP层（控制器层）-》前三层
前三层加起来都是应用层，就是http所在的层比如cookie在其中某一层，
这些组成了我们的应用层，
支持压缩，这样传输的时候就更快，为什么要压缩？因为传输的内容越来越大，图片大，支持文件的编码navagator 为了统计客户端的信息，
cache也是在头部，
1.1 cookie支持+管线化（复用连接TCP是一个管道）同一个域名一次支持6个文件同时进入管道，至少这六个不用再发请求了，只不过是串行的
主要解决通信问题，太浪费资源了，这就是我们为什么要发雪碧图的原因，要是每次发送请求都要送请求，3次链接，握手，每次发文件都要握手，然后请求和响应，当页面越来越复杂的时候，很多个文件的时候，就浪费了很多个请求的次数，1.1就让他变成持久连接，不一请求完就关闭，让它能留一会儿，就能复用我们的握手，这样就能减少握手，真正多传输一些数据，
虽然他复用了tcp，但是它内部仍然是一个请求2要等到请求1完成...就是同一个域名，他会同时支持，每次6个TCP/IP复用的管道，但是有一个缺点，就是里面是串联的，所以也不是很高效
还有cookie机制，有利于识别

重点！http2
2.0 带宽，
1.1基础上cdn1 cdn2...也就是同时支持不同的域名，然后每个域名中有6个可以串联，如果同一个雨萌超过6个，就下一波。里面会维护一个队列
1.1的主要问题就是串联，1.TCP的启动比较慢，2.
2.0最大的就是能让文件并行的去传输，不再串联，为什么串联？1.1虽然复用了tcp,持久化链接，但是每个文件要确保顺序到达，并且要完整，要等到前面的传完了后面的才能传，不然文件就会乱掉
2.0给每个文件添加了一个数据帧，就像一个指针一样，MD5，
多了一个二进制分针层，就能让我们的文件能并行传输，同一个域名建立一个长久的链接通道，可以一致传，顺序不重要了，到了浏览器后会根据帧重新组装文件，因为有id
2.0极大的利用了网络的带宽，
所以雪碧图不需要了，1. 有图标字体库（比图片体积小）2. 有连接的时候2.0搞定，
看极客时间的那篇文章
https://time.geekbang.org/column/article/148546
https://time.geekbang.org/column/article/147501
https://time.geekbang.org/course/detail/100041001-174319

js动画优化
requestAnimationFrame 还要更好的方案
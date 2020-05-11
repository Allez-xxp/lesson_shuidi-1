## 编译原理
跟代码的运行有关
代码：都是字符串
电脑运行的时候
```js
// 电脑接收到的是一个字符串
let codeString = `const http = require('http')` //虽然这个字符串没什么实际意义
let cal = `123 + 456 * 789`
function run 
// 电脑拿到那个字符串后
// 1. 词法分析 一段解析，分析问一个个合法的词(token)
// 每一种语言都有对应的此法分析器，node中什么时合法的词呢？比如consth是一个定义变量的合法的值
// 在解析的时候，每个合法的词，一定是有意义的，
// 遇到空格 ，会认为没有特殊的意义，会被忽略掉，读到http，是一个整体，也不会从http中间断开，也罢它当成一个合法的值，遇到空格就忽略，然后require，会分析为他是一个方法，然后里面是一个参数

//比如让你传入一段合法的四则运算，以字符串的形式传入，然后要把cal计算出来
// 1. 分词的过程，因为收到的是一个字符串所以要先分出来从1开始，一个个的读，那怎么分？123是一个数应该要分为一个合法的数字，是个整体，然后下一个遇到空格，忽略，然后再分下一个整体，这也是词法分析

//还比如，浏览器要渲染html,但是浏览器从服务端饭回来的html,比如是一个字符串server->
// <h2 class="title" data-id = "1">title</h2>
// 然后浏览器要渲染，就要进行DOM的解析，也是要进行词法分析
// h2 class = title data-id 1 title

//2.词法分析完了之后就是语法分析，这个是计算机编译原理中的流程 
//3.形成AST这样一棵树了

// 和http结合讲，服务端和客户端（一般是我们的浏览器）
```
## 客户端
客户端向服务端发送请求，就用ajax:Xmlhttprequire fetch这两个接口

服务端给你返回
状态码
响应头，响应体
http本质是超文本传输协议，是以文本的形式传输的，首先它是文本传输协议，价格超是说，不仅仅是文本，还能传输视频，音频等
http1.1是基于文本的格式来传输的，传输的最原始的文本长什么样？有的地方叫http报文格式，就是http传输的文本是有一个格式的，然后有些地方把他叫做http报文格式
请求函
http规范 请求行后面的cr+lf是回车加换行
首部和实体间有一个空行，是为了将他们隔开
使用xhr的时候
```js
const chr = new XML()
// 打开 最后的ture是同步还是异步
xhr.open("POST", url, true);
xhr.setRequire('concontent-type', 'x-www-form-urlencoded')
xhr.send('keywords=js')
// 调用的只是js的api
```
然后请求这样的api就会来到浏览器做一个拼接报文操作
```js
POST url (版本号) http1.1
// 然后是首部：
concontent-type: x-www-form-urlencoded
user-argent: '' //空格加引号
// 然后是实体
// 先空一行
keywords=js //响应体
```
是一个拼报文的操作浏览器会帮我们拼报文
node不会帮我们拼
自己用node实现一个发请求的一个客户端client.js

Transfer-Encoding: chunked
Transfer-Encoding: compress
Transfer-Encoding: deflate
Transfer-Encoding: gzip //不是文本上的压缩，是在网络方面上的压缩 传输的时候gzip 速度就会快些
Transfer-Encoding: identity

'Transfer-Encoding':'chunked' //分块传输
没有chunked的报文：

有的报文：
是http自己加上去的长度 当前块的长度
0 就是传输完了 后面没有内容了后面会有一个空行
10
1234567890
9
123456789
0

## 'Transfer-Encoding': 'chunked'
```js
没有 chunked
HTTP/1.1 200 OK
Date: Mon, 11 May 2020 12:52:48 GMT
Connection: keep-alive

ok

```

```js
浏览器得到 响应报文：
HTTP/1.1 200 OK
Date: Mon, 11 May 2020 12:52:48 GMT
Connection: keep-alive

10： 长度
1234567890
9：
123456789
0

```



gzip 降低文件传输的体积 它的压缩算法是什么？有个著名的数 哈夫曼编码

## 响应报文也是一个纯文本的东西
浏览器得到的报文也是纯文本的
报文解析成合法的下次来

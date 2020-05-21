electron 是js在exe的应用，学他对就业 TOP100公司。前端效率，开发工具非常有帮助

2.滴滴内部的即时通讯 。。。 内部使用，比web应用更好的表达， 
1.他可以跨平台 全端开发 
对于就职于大型公司，用来替代1x1（安装）应用
3.RN Fluter Electron 一脉相传

阿里 腾讯

前端能力题
chromium /v8引擎 js技能优化 v8引擎让效率提升10倍

## 1. chrome的navigator.userAgent为什么又mozilla字段
chrome大面积流行的时候，mozilla开拓了浏览器内置devtool
window.navifator.userAgent用来判断是chrome还是ie
为什么查出来的结果是以mozilla/5.0开始的？

js视野能力
红宝书 + 小黄书 + 阮一峰es6 前端 js + es6
深入浅出node.js 全栈能力 node

electron chromium（是chrome开源版本，是把商业拿掉后，）
Chrome希望能得到为Safari编写的网页，于是决定装成Safari，Safari使用了WebKit渲染引擎，而WebKit呢又伪装自己是KHTML，KHTML呢又是伪装成Gecko的。同时所有的浏览器又都宣称自己是Mozilla

electron = chromium + node做桌面应用
是一个可以打开的应用，而且支持浏览器浏览网页的能力
用web技术html/css/js来做桌面应用 好处:开发效率很快
node让我们拓宽能力点，系统能力 fs net
chromium UI能力

摸清楚浏览器的进化历史，
1989年互联网诞生 伯纳斯。李
1990 nexus开发了第一个浏览器 实验室版本，有一个缺点：不能显示图片，因为http还只有0.9版本，还不能支持多种版本，要到1.0才可以
1993 nexus出来的工程师开发了NSCA，可以看到图片，
1994 互联网最重要的时刻，网景公司 mozilla出来了，不过是叫Netscape 
    因为mozilla中支持frame 只有商业化网站才会用到frame(框架)
    iframe是用来上广告的，会在网页划分出一部分放广告 有了iframe就能嵌入第三方页面，最重要的是商业广告，之前的浏览器是不支持的。
    然后有了网管和运维，会根据浏览器的用户代理，判断是最新的mozilla，就把又iframe发送出去，并不是mozilla的就把没有iframe的发送出去
    服务器端，根据userAgent HTTP 1.0 mozilla 网景推出iframe页面
    否则返回NSCA 不带iframe的页面
1994 IE浏览器 win 95 从iE开始会在自己的useragent中加入mozilla的声明，
    为了能快速商业化，除了自己的版本之外，还加入其他的浏览器，，是为了其他//。。。。。。
1994 JavaScript 10天被开发出来
2002 新版mozilla出来，早期的被IE打败（netScape）
2008 基于firefox chrome推出来了：极值的简洁，多进程的快速加稳定，10倍速的v8引擎
2009 node的作者Ryan Dahl基于v8引擎（js引擎解析） + c++接口（可以操作硬件加设备驱动 文件系统 network）
    node的性能调优看狼书 还有js的非阻塞io（PHP PYTHON 非阻塞，省钱),
    解决：js可以在服务器端
2011 英特尔工程师王文睿开发了node-webkit webkit是一个内核，浏览器内核可以和node结合起来
2012 electron 里面可以用node web技术，可以组件化开发
    electron = chromium（提供应用的窗口） + node做桌面应用 nativateApi(跨平台) 
    window中任何一个应用就是个窗口
    node net底层操作能力，npm
    nativateApi（window linux都有一个邮件赋值，是系统能力）
    能力再一次延伸，提供了不同操作系统的兼容性
2007 移动互联网来了后出现了vue和react,因为DOM api性能太差了，还有一个核心原因就是代码复用太差
    组件化化之后可以复用
    react native fluter uniApp 他们做混合开发 结束了IOS/android要做两套东西
    代码复用
    也可以写前端，然后又都是组件化，代码复用好

让浏览器吧其他平台能力接受进来
js工程师可以做前端开发，因为历史进程，v8 让node/桌面端 NW electron /混合应用开发 /App RN/fluter(性能好)/Uni(开发成本底)
现在的app用android/ios做壳子
代码复用 组件化

初始化一下npm init -y
cnpm i electron
添加一个index.html
index.js
package.json

## electron项目架构是什么样的？
electron构成 chromium(网页解析到桌面上) + node + natiteApi

mvc 是B/S架构
MVVM 是REACT/VUE
chromium要能解析到桌面上，所以是用React/Vue
全栈

新建一个项目：
electron/electron_control
main目录 是nativeapi的开发目录
app应用层
app/renderer渲染层
app/renderer/pages
app/renderer/src
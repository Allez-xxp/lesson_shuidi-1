## 背景
MPA
虽然也是分部门写，但始终在一个文件下（src）
- 源码依然放在一起，比如支付部门，修改了代码，打包上线的，依然还要打包，不能独立上线

拼多多：砍价，活动页面 h5那种，存活的时候还是比较短的，有时效性
后台管理 开发难度

以功能划分不同的部门

- 微前端 巨石应用，就是项目很庞大，修改了一部分代码，就要全部都打包一次，
不过还好是几天开发上线一次，上线次数还算不多
 修改了代码，热更新的话，体积也很大，无论是开发还是上线，都很大
- 业务不一样，代码也应该分离，是物理层面的，就是说不应该放在一个仓库中，应该放在独立的仓库中
微服务把上面的问题全都解决掉，每个业务是一个独立的服务，互不影响，独立开发，上线，运维

微前端怎么做？
有一个框架 qiankun
微前端对于后台管理系统确实是一个很好的
qiankun是基于国外的single-spa做的

## 不用框架 搭一个
独立开发，上线 运维的微前端
每个业务都独立了，最基本的：每个业务用的技术可以不一样
微前端分两个部分 
+ 一部分叫主应用基座
主入口，主应用，就是基座
划分子应用的入口，具体内部的实现分给子应用去写

## 主应用 入口www.fe.com
嵌套进去

## 子应用 上线后也会有一个域名
micro
www.a.fe.com
www.b.fe.com
上线完就是一个url
最终把子应用入口嵌套在基座应用中，就完成了

html中有一个便签，（现成的东西）里面嵌套别的应用，可以把域名中的其他其他域名全部引入进来
iframe标签
object是引入媒体资源的

```html
<iframe src="http://www.baidu.com" frameborder="0"></iframe>
<!-- 这个src专门嵌套域名 -->
<iframe src="https://bilibili.com" frameborder="0"></iframe>
```
微前端就是要能做到这样
iframe有些问题，他的样式难定义，用户使用使用的感受，都无法达到整体的那种感觉
iframe操作后与外面的主应用天然隔离，体验感不好



用自己的手段实现
1. 一个主应用 main
2. 微应用 micro
需要用到react-router
加一个src

引入远程的资源 不关心子应用具体怎么实现的，只关心上线后的域名，就是一个url

微应用，我们用react写
开发一个Pay.jsx

打包 让他们能独立上线
1. 配置.babelrc
2. 就是那些插件
babel官网，文档有说怎么和react结合
npm init -y
cnpm i @babel/preset-react -D
然后看怎么配：
{
  "presets": ["@babel/preset-react"]
}
装完了就能识别jsx语法了。
然后是babel的一套东西
@babel/core @babel/cli
然后是一套webpack
装webpack
cnpm i webpack webpack-cli
入口路经必须用path(node的)
装babel-loader -D
react -S
打包 npx webpack
目的就是让微应用能独立打包，独立上线，上线的就是我们打包后的dist/Pay.js,所有微应用的入口
在dist/Pay.js运行一下live-server 上线后就是这样一个url http://127.0.0.1:8080/Pay.js
怎么把这个资源加载到基座中的Pay函数中？

怎么把这个资源加载到主应用中？
远程的url引入过去，用：systemjs这个工具 子应用和基座工程对接
美团有一个文章关于微前端的 掘金上https://juejin.im/post/5e57b6f0f265da57547794c9

systemjs是一个模块管理的，前端有很多模块，commonjs es等等，systemjs就是做一个模块的大统一，无论在哪个平台上，node还是别的，能让在任何一个地方模块都是统一的。

webpack打包后的代码是IIFE
```js
// 模块化管理，没用到commonjs 也没用ES 就是一个立即执行函数，这样的代码那怎么当作模块引入？
(function() {})
```
webpack打包后3不像
要用同一个模块化，定下来 用systemjs这样一个模块化管理的
用一个插件规范它 cnpm i webpack-system-register -D
看一下用这个打包后的文件长什么样子
装完后引入一下，引到webpack的配置中webpack.config.js

装了后引入到webpack配置中，webpack的插件放到plugins中
new webpackSystemRegister({}) //传个空对象进去（全部默认的），他这里是可以放参数的，

再打包一次，npx webpack
就相当于注册一个模块 之前的立即执行函数放到一个execute的回调函数中
解决模块不统一问题

上面就实现了独立上线了，
然后去主应用引入就行
用systemjs引入

pay得是一个组件啊,react的新东西，两个api Suspence(悬念，就是不知道的),lazy
Suspence,代表组件正在加载中，这时组件没有内容。因为组件会有一个懒加载，也就是必须有一个加载的过程，Suspence是一个组件提供一个功能，
fallback，回退，就是组件没有内容的时候，就回退到这里
组件有内容，组件就用lazy来引入
运行一下，因为用了react-router，所以要装一下，另外还要给主应用配webpack babel

加一个main/index.html

用parcel 完全0配置的打包工具

装一下，然后用它启动index.html
yarn global add parcel-bundler (没用) 用这个：npm install -g parcel-bundler
然后yarn init -y 或者 npm init -y就能启动了
不用上面那个，为了看效果，直接右键index.html开终端，然后parcel index.html

报了个错：Target container is not a DOM element.
因为index.js渲染的时候挂在的地方写的是document.getElementById('app'),所以需要填充这个节点，在index.html加一个app节点

没能把资源引进来，说组件不合法，
System引入远程资源的时候，没有将System这个变量哪里来加进去，用一个cdn的地址把他引进来
https://www.bootcdn.cn/ 官网
<script src="https://cdn.bootcdn.net/ajax/libs/systemjs/6.3.1/system.min.js"></script>

然后有一个跨域问题
设置跨域头就行live-server怎么设置跨域头？
加一个--cors
dist/index.js下运行live-server --cors
浏览器控制台network->js能看到拿到了Pay.js这个远程的模块。(记得运行基座的时候要记得把子应用也开启)





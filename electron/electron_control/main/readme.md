NativeApi IPC是什么？主进程 和 渲染进程通信
app应用层
app/render 渲染层
mian中的是跟nativateAPI相关的东西

app/renderer/pages这个目录，到时候渲染的时候多的这个pages目录，到时候要打包的
electron比网页好的地方：本地存储更好，写的html文件和css文件 可以进行离线应用
app/renderer/src下：
npx create-react-app main --use-npm //使用npm安装依赖，就不使用yarn
npx是npm的一个新的功能
会到全局或者当前目录中找到一个库，创建项目
为什么不直接create-react-app
npx 会根据当权项目或者全局的找到安装的脚手架
npx的优点
https://www.jianshu.com/p/a4d2d14f4c0e
http://www.ruanyifeng.com/blog/2019/02/npx.html
npm会在machine上创建一个目录,node_modules占用的空间比较大
npx可以根据应用的不同的版本， 不会污染本机，临时使用，用完了删掉

npm config set registry https://registry.npm.taobao.org

main/index.js 入口
src下的main是我们的前端的页面 

src/main 运行npm run start在浏览器中运行这个react
main/index.js中 去electron_control这个根目录下 在窗口打开应用
npm init -y
cnpm i electron
去package.json
    "start:main": "electron ."
electron .就是启动electron 他会找到main/index.js这个入口文件
  "main": "main/index.js",
npm run start:main启动窗口
main/index.js中需要再改一下

electron_control/app/renderer/src/main/src/App.js
// electron调用nativeAPI chromium有解析js的能力
// ipc进程间通信inter-process communication进程间通信 
// 为什么这里会有进程间通信？
import { ipcRenderer } from 'electron';
chrome是多进程架构，他有一个进程打开一个tag,他有一个网络进程负责去通信，还有一个GPU进程负责渲染，electron架构中他就是一个多进程架构
renserer中react项目是ui,渲染为主，renderer进程负责渲染
nativeapp是有主进程与操作系统沟通，所以需要去做进程间的通信
ipcRenderer负责主进程之间通信，
报错了：TypeError: fs.existsSync is not a function
create-react-app既好用又不好用 创建脚本 开箱即用，0配置
他在创建的时候，没有webpack
electron不支持目前的import调用，他要添加变异流程来支持他，但是create-react-app是一个0配置启动项目
要是加一些东西 webpack的编译流程不好搞 有一个reject的东西可以把之前的webpack的配置拒绝，然后自己重新写一个，
为了解决这个问题：
去浏览器端 learn-electron
npm i customize-cra 定制cra
yarn add react-app-rewired
如果在react的项目中使用的是create-react-app,虽然能快速启动起来，但是有些webpack不好配

create-react-app
如果要添加新的支持，比如ts,stylus,electron（它本身不支持import，它是node中的一个东西，需要用require）等
那就要进行打补丁，用
customize-cra
react-app-rewired //就是重新设置一下
然后再在根目录下src/main
新建文件：config.overrides.js
然后去package.json中
    "start": "react-scripts start",
变成：
    "start": "react-app-rewired start",

然后重启之前的那个start:main
然后去

    "start": "SET BROWSER=true react-app-rewired start",
不在浏览器端打开，（mac前面不加SET）,只在窗体中显示
    "start": "SET BROWSER=none&&react-app-rewired start",
    记得不能有空格


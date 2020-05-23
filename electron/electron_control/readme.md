create-react-app
如果要添加新的支持，比如ts,stylus,electron（它本身不支持import，它是node中的一个东西，需要用require）等
那就要进行打补丁，用
customize-cra
react-app-rewired //就是重新设置一下
然后再在根目录下

用view/togo-development可以打开窗口的控制台

## 再来
来到main/index.js

去ipc.js封装
index.js中使用ready的时候使用？

renderer/src/App.js
ipc.js中console.log了
可以在终端中看到

在ipc.js中把他变成复制操作 成功
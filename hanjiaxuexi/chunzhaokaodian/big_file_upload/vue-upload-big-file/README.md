# vue-upload-big-file

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<!-- 
1.在main.js里引入element-ui 
https://element.eleme.cn/#/zh-CN/component/quickstart
2.进入App.vue
3.切分了文件后重点来了
 -->
- vue实现上传文件的细节
在开发之中，无论是前端还是后端，传输文件，特别是大文件，有可能发生丢失文件的情况，比如网速不好、服务器超时，如何避免丢失呢？
通过hash串：
把文件名，传到服务器，文件名不是唯一的，不同名的文件内容可能是一样的 针对文件内容进行hash计算，只要是同样的内容，计算的hash值一定是一样的
hash前端算一个，单项加密的
后端拿到内容算hash
如果前端hash和后端hash一样，证明网络传输无意外
如果不一样，就有丢失，要重传
4. 进入public 的index.html 把hash.js放在public(是个静态目录)文件夹下，是可以输入端口访问的
- 总结
html5特性你怎么理解，localStorage ...
web workers 优化前端性能，将要花大量时间的，复杂的放到新线程中去计算
文件上传通过hash计算，检查文件没有问题时

- 第五个视频
给用户快速感知，用户体验是核心，通过在hash.js web worker的进度条的设计 (sperk.append后面的if else),再通过App.vue的promise的resolve，引入el进度条
接下来把他上传掉

建一个文件夹叫vue-backend:
npm init -i
yarn add fs-extra
nodemon index.js

解决完跨域问题后，因为监听端口改变了，所以要重启：nodemon index.js
再进http://localhost:8080 看Network中verify的Headers中filename信息

-第六个视频uploadlist
并发http,前后端体验
requestList:this.requestList（重点）

requestList然后是文件上传：
去vue-backend文件夹下的index.js

await fse.move(chunk.path,path.resolve(chunkDir,hash)); //把文件移进去。chunk.path表示文件在暂存的地方，要移到服务器的目录下path.resolve(chunkDir,hash)切片的地址
res.end("received file chunk"); //然后再次回到前端APP.vue
就会调用createProgressHandler()

<template v-slot="{}"></template>
https://www.cnblogs.com/goloving/p/11126937.html
https://www.cnblogs.com/songForU/p/10641751.html

- 结束了分片上传，分别计算blob进度，以及计算总进度（7）
接下来是发送一个已经完全上传的合并的请求，暂停上传

- 第八集
断点续传，断的是上传、hash计算
怎么断？又怎么续呢
断abort
恢复
先去App.vue加el-button

老师的github
https://github.com/shunwuyu/bytedance/blob/master/big_file_upload/vue-upload-big-file/src/App.vue

big_file_upload\vue-upload-big-file> npm run serve
big_file_upload\vue-backend> nodemon index.js

合并完了(处理完了request之后)之后到前端App.vue,做一个消息提醒
再到handleFileChange(e)做一个重置
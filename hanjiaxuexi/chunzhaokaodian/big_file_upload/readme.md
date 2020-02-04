【字节跳动面试官：请你实现一个大文件上传和断点续传】
https://juejin.im/post/5dff8a26e51d4558105420ed
分析作者为什么出这个题？
文件上传是开发中的难点，大文件上传及断点续传更是难点中的细节及核心技术点。
面试官在考察es6文件对象，ajax上传，async await promise、后台文件存储、流操作等全面的全栈技能的同时提升难度到大文件和断点续传，通过这个主题就可以较好地考察面试者全面解决问题的能力和技术细节。移动时代，图片成为社交主流，短视频时代铁定是大文件，所以在上岗后这个题的知识点是必须掌握清楚的。所以这是一道非常实在的好考题。

一个文件如果是传统的发送请求，比如上传8MB
大文件上传：
- 把它切片
1. js相比于其他大型语言来说在文件操作中确实不如c++,java,但是随着我们在es6的文件对象file,node的readfile file stream处理能力有了之后，我们处理文件的能力有所增强。
任何文件都是二进制，二进制文件，分割成blob类型的文件
start,size,offset 比如8M的 size为1M，那会分为8份，按顺序组合起来
到时候http请求就会分成n个切片，并发上传
【前端大文件上传网上的大部分文章已经给出了解决方案，核心是利用 Blob.prototype.slice 方法，和数组的 slice 方法相似，调用的 slice 方法可以返回原文件的某个切片
这样我们就可以根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间
另外由于是并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序】

- 聚焦前端的切片，让http并发带来上传大文件的快感
打开文件终端：
npm init -y 初始化一下将项目变成node项目
file_slice.html文件模拟切片过程
启动live-server，本地服务器，是npm的一个包，为静态文件提供http访问方式。
没有的话就npm i -g live-server
http://localhost:8080/file_slice_upload
模拟一个网站要上传大型文件

1. file支持file.slice()方法完成切片，blob类型文件切片，也叫做js里面二进制文件类型，同时blob有blob协议，可以让我们在上传文件上传到服务器之前就可以提前预览。
补充什么是blob以及其用处 blob.html
blob文件类型，blob文件协议是es6由chrome发起生成的一种协议，让js具有在客户端处理文件以及url访问响应，再交给image的能力。
const URL=window.URL;
const objectUrl=URL.createObjectURL(file);//就会生成一个ObjectUrl
这个是十分耗性能的在完成之后要URL.revokeObjectURL(objectUrl);释放掉对象
不然只有在关闭了窗口后他才会自动回收

- 服务器端
如何将切片（通过post发送请求过来的通过body接受）合并成一个，并能显示原来的图片。
node 的stream流

npm install -g nodemon

可读流可写流
每个chunk里都是一个二进制流文件
用promise.all来包装每个chunk的写入
用fes.create的start，end成功写入文件
每个chunk又是一个先创建可读流，再pipe给可写流的过程。
思路：以原文件作为文件夹的名字，在上传blobs到这个文件夹，切每个blob都以-index的命名方式来存储

-http并发上传大文件切片

- 继续(三)
把分割的blob上传到服务器，用ajax
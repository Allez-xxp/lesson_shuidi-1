node 中koa
在Go里面叫gin,是Go的极简的开发框架。用它可以快速开发一个web应用。
https://www.jianshu.com/p/98965b3ff638/

上传文件的curl代码
curl -X POST http://localhost:8888/upload -F "file=@/Users/shunwuyu/Desktop/yb.jpeg" -H "Content-Type:multipart/form-data"
解释：curl:Linux中发送网络请求的一个命令 ；-X 发出一个请求（的参数）；POST方式；向哪个端口http://localhost:8888/upload；-F表示要上传的文件是谁呢？；后面是文件路径，@是根路径，就是C盘啊D盘啊等某个地方；-H上传到哪里去。头是multipart,声明了multipart就说明是表单里面的一个文件上传，文件上传就叫做multipart（有附件）；form-data上传一个文件，以表单数据的方式
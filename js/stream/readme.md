流的概念
这些都统称为I/O操作
流分三个部分
- source 源
- pipe(node中) 管道 linux中就是|
- dest 目的地

作为流的源头的那端有什么？
1. 文件拷贝的时候
读文件：读文件能读出来内容
经过一个管道
然后写文件

2. http中
source-->
请求 响应
3. 输入输出
console.log()获取屏幕的输入，或者输出信息

写代码的时候就要用一种方式，能有一个管子把代码连起来
 linux中 | 这个就是一个流的符号
 ps 
 可以查看系统上启动的服务，启动的进程的信息
 grep
 是可以处理文件的一个很有用的命令 文本查找的 没有文件名会报错
ps | grep 16140（进程号）《--指定查找的
就能查到这个进程
grep 'source' ./readme.md
ps | grep 16473

http中的req, res

用ab
apache bench
看性能，可以看一下http和http1两个文件那个性能更高 观察响应的速度
-n 请求的数量
-c一次请求的速度 并发的数量
ab -n 100 -c 100 http://localhost:8080/
QPS(request per second) 一秒能请求多少个请求


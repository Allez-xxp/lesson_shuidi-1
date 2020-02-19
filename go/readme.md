Golang 云开发时代的C语言，具有C语言的一些特性。比如结构体。
node迁移到go
对比koa和gin开发框架
# Go的初体验
运行用go run main.go
- 配置go
go安装包：
https://studygolang.com/dl

如果可以用：(管理员身份进vs code)
go env -w GO111MODULE=on
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
go get -u github.com/gin-gonic/gin //全局安装gin
换国内的镜像
https://www.sunzhongwei.com/problem-of-domestic-go-get-unable-to-download?from=sidebar_new
然后安装vscode中的东西就不会报错了

Go 语言环境安装教程：https://www.runoob.com/go/go-environment.html

1. 每个文件都是一个独立的模块
package main func main(){ 程序开始了}
2. go 内置模块
用import引入
import (
    "fmt"
    "net/http"
)
3. if 后面不用括号
4. 变量直接写，:=定义并赋值
5. resp, err := http.Get("http://www.baidu.com")表示同步概念，因为没有看到回调函数。
没有异步会性能弱，但是go天生多核
resp,err这个风格类似于node的解构(es6的)

Go 可以像koa一样来写全栈
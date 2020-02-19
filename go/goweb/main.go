package main

import (
	"fmt" //安装了gin，这里会到这个地址安装gin
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 上传一个文件
	router := gin.Default()                       //返回一个路由对象，其实也就是web应用对象
	router.POST("/upload", func(c *gin.Context) { //向upload路径上传文件
		// 不使用GET input file
		file, _ := c.FormFile("file") //取出请求时发送的文件。真正的文件 res body file ;c.FormFile是拿出来上下文中的文件
		// filename := "yb.jpeg"

		c.SaveUploadedFile(file, file.Filename)

		//200状态码
		//返回字符串，就是相当于node中res.end '%s'是占位符
		c.String(http.StatusOk, fmt.Sprintf("'%s' uploaded!", file.filename)) //有点像C语言的sprintf
	})
	router.Run(":8888")

	// r := gin.Default() //相当于node new Koa(),r相当于web app应用
	// // 路由GET请求
	// r.GET("/ping", func(c *gin.Context) {
	// 	// c的类型是gin框架里面提供的用户访问的上下文环境，*表示指针，指向gin下的context
	// 	c.JSON(200, gin.H{ //返回JSON，返回的状态码是，200；gin.H json化的简写
	// 		"message": "png", //以逗号结束
	// 	})
	// }) //请求路由,用函数相应请求 c相当于node的context上下文环境
	// r.Run(":8888") //http://localhost:8888/ping
}

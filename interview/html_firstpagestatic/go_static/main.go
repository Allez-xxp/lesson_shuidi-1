package main

//首页静态化

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin" //极简的，类似node中的koa，也是极简的 //。。。。
	//模板的内置库 文本替换
)

//数据的类型约定
type Product struct { //schema
	Id   int64  `json:"id"`   //64位的整型（长整形） 点操作的时候 换成id
	Name string `json:"name"` //后面是调用的方式
}

// var声明的是全局的
// 数据库要给出的数据
// 第一次去取它，之后用生成的html文件返回
var allproduct []*Product = []*Product{ //要给类型申明 *是指针 {}表示集合//。。。。？？
	{1, "苹果手机"},
	{2, "小米手机"},
	{3, "OPPO手机"}, //最后一定要加一个,

}

// 一次性定义多个变量
var (
	// 生成的Html 保存目录
	htmlOutPath = "./tem" //未来推到cdn中去
	// 静态文件模板目录
	templatePath = "./tem"
)

func main() {
	//r就像是route
	r := gin.Default()      //默认
	r.LoadHTMLGlob("tem/*") //指定模板在哪里 views在哪

	//传统的
	// 指定一个controller层
	r.GET("/index", func(c *gin.Context) {
		GetGenerateHtml() //帮我们保存
		c.HTML(http.StatusOK, "index.html", gin.H{
			"allproduct": allproduct, //一定要加一个逗号
		}) //要写状态码 //H是handler
	})
	//再来
	//现在的 看到/id.html 说明这个文件seo很重要，并且比较复杂，一定时间内会过期，然后重新编译，数据变了也会
	//此时的这个不需要模板编译了，因为上面已经编译了，静态化了
	r.GET("/index2", func(c *gin.Context) {
		// demo
		GET.HTML(http.StatusOK, "htmlindex.html", gin.H{}) //已经是一个编译后的文件了，所以不哟个再传东西，所以写一个{}空
	})
	r.Run()
	// 这样就能启动web服务了
}

func GetGenerateHtml() {
	// 定义变量并且有值:=
	// template.ParseFiles一个文件转成模板，他就变成了一个template
	contentTem, err := template.ParseFiles(filepath.Join(templatePath, "index.html")) //要处理什么文件 生成文本，存一下//引入路经的库返回绝对的物理路径
	// 第一个是得到的文本，第二个是可能出错
	if err != nil {
		fmt.Println("获取模板文件失败")
	}
	fileName := filepath.Join(htmlOutPath, "htmlindex.html") //路经字符串
	generatestaticHtml(contentTem, fileName, gin.H{
		"allproduct": allproduct, //逗号要加
	})
}

// 生成html文件
// interface具体里面的类型
// fileName string路经 produce gin.map后变成map
func generatestaticHtml(template *template.Template, fileName string, produce map[string]interface{}) { //形参的名字 类型 是text/template内置的类型，template.ParseFiles生成的
	// if(exist(file))
	// os是系统中的一个
	file, err := os.OpenFile(fileName, os.O_CREATE|os.O_WRONLY, os.ModePerm)
	if err != nil {
		fmt.Println("打开文件失败")
	}
	// 这是go中的异步，做完了一件事关掉 go中对异步的一个
	defer file.Close()
	//模板的编译就在这里 执行模板 将我们的数据跟模板一起编译一下
	template.Execute(file, &product)
}

//这里有一段解释
// 执行一下试一下

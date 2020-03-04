package main //packag就是我们的module的概念
import (
	"net/http"

	"github.com/gin-gonic/gin"
	// "net"
) // Go现代C语言
func main() { //入口，以模块开始
	// part1:map
	// map[type]type 是种数据结构
	//很多个国家的首都，就是一个数组
	// :=是声明并赋值，我们只是要先类型声明，所以用var
	// 中间不用等号！！！var countryCapitalMap = map[string]string，声明的是类型，没赋值！
	// var countryCapitalMap map[string]string //变量声明,要用var才能用map,后面是它的类型 这里还没分配空间
	// //  map[key]value强类型声明，key-》string型，value->sring型
	// // make是go中类似分配空间的
	// countryCapitalMap = make(map[string]string) //make相当于C语言中alloc管理内存空间
	// //  赋值key->value,里面是双引号,因为是string类型，他会类型检测
	// countryCapitalMap["Franch"] = "巴黎"
	// countryCapitalMap["Italy"] = "意大利"
	// countryCapitalMap["Japan"] = "东京"
	// countryCapitalMap["India"] = "新德里"

	//  遍历一下 js中有一个for of 遍历数组
	// arr 通过索引遍历
	//map json 键 没有顺序 相当于[{}]
	// range 10就会产生0-10之间的数字 不用再用for(var i=0;i<10;i++)
	// for country := range countryCapitalMap { //区间展开，展开key，range得到一个循环，得到一个个的country数组
	// 	fmt.Println(country, "首都是", countryCapitalMap[country])
	// }

	//part2
	// 引入go的gin web框架开发引擎
	engine := gin.Default() //相当于express const app = express()
	//加一个get请求，根目录的请求 context上下文访问的环境，类型是*gin.Context指针类型

	engine.GET("/", func(context *gin.Context) {
		// context相当于koa中的ctx,相当于express的req+res
		// http.StatusOK->200状态码 利于代码的可读性
		context.String(http.StatusOK, "hello gin get method") //相当于res.send返回,200表示成功了

	})
	// resetful 使用相对应的予以的请求动词+url语义化 /login POST
	//post/1234 GET 读取谋篇文章

	//POST添加数据
	engine.POST("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		//POST是新增数据
		context.String(http.StatusOK, "hello gin post")
	})
	//PUT是干嘛的？修改数据，整个的替换
	// {username:'ysw'}
	engine.PUT("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		context.String(http.StatusOK, "hello gin put")
	})
	//删除数据 比如删除/post/123这篇文章
	engine.DELETE("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		context.String(http.StatusOK, "hello gin delete")
	})
	//PATCH 更新局部，修改一部分
	engine.PATCH("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		context.String(http.StatusOK, "hello gin patch")
	})
	//HEAD 不在意返回的内容response只在响应头里面 再不获取资源的情况下，了解资源信息，有没有改过？文件大小？
	engine.HEAD("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		context.String(http.StatusOK, "hello gin head")
	})
	//选项？测试一个url支持的所有方法，比如GET　POST　DELETE　等等
	engine.OPTIONS("/", func(context *gin.Context) {
		//要求在保存数据的时候发送POST请求
		// 相当于res.json
		context.String(http.StatusOK, "hello gin OPTIONS")
	})

	//_我不处理，直接输出
	_ = engine.Run(":3000") //相当于node的listen 端口默认8080,要放外面
}

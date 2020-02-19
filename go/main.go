package main

//声明程序的包文件，是程序的入口，然后程序就会从main开始了
// go中是实时报错的
//函数声明的关键字func,go中以main开始，入口
// 引入import，记得是()
import (
	"fmt" //格式输出的。node里面require('fs),就是类似于node里面引入一个语言内置模块，引入了里面就有一个println向控制台输出hello,world
	"io/ioutil"
	"net/http" //在node里面就是require('http')
)

//js是运行在数组环境下运行，运行的是script,而C系列的都是先运行main函数。
func main() {
	fmt.Println("hello,world")
	//用爬虫，来比较一下node和go语言。爬虫用到的库：cheerio,是第三方npm,go 用get
	//用了http模块，请求，fs 写入文件
	// http模块的get方法，把想要爬下来的网页爬下来
	// 请求文件是要花一些时间的node是用回调，go里面自动是用同步
	// go里面用:=表示定义一个变量的同时赋值
	// 要加个err,因为同步的会阻塞。resp,err这个风格类似于node的
	resp, err := http.Get("http://www.baidu.com")
	if err != nil { //nil相当于node的null，go中if后面不要(),只要{}
		fmt.Println("http get error", err) //并把err打印出来
		return                             //go语言里面不用写分号。
	}
	// fmt.Println(resp)
	// io是接口。网络io,是通过网络端口进来的，文件io,比如要读入一个文件
	// resp.Body中resp是请求，body是请求完成之后百度的响应体
	// 将响应体交给ioutil把他读入内存中，读出来后有两种结果，成功或失败。
	body, err := ioutil.ReadAll(resp.Body) //ioutil是go的一个库
	if err != nil {
		fmt.Println("read over")
		return
	}
	fmt.Println(string(body)) //变一下类型，确保他是字符串的

	// body,err :=
}

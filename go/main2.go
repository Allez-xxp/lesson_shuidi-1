package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	fmt.Println("node 向Go迁移")
	url := "https://juejin.im/timeline" //声明变量
	download(url)                       //将爬虫交给download方法（封装）
}
func download(url string) { //Go可以进行类型声明，node是js,是弱类型的，不用声明类型。Go是强类型的
	// C语言变量是什么？变量名是地址的一个代表，索引内存空间，取&会返回内存地址
	client := &http.Client{} // node中要实例化一个类，new实例，启动一个http客户端，向一个地址发送请求；client server  {}表示需要实例化一个对象出来 { } &取地址
	// node里面就是 new http.Client()，http协议中，可以实例化一个客户端，会发送一个请求
	// 将请求细化为req,resp(请求响应)，就像koa中的req,res
	// 下划线像相当于es6的rest，剩余参数..._
	req, _ := http.NewRequest("GET", url, nil) //nil相当于data。会进行一个同步请求，发送请求后会生成一个req对象，等下对他进行io读取
	// 爬虫的时候要去设置头部
	req.Header.Set("User-Agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)") //类似node中的writeHeader
	// 浏览器就叫做User-Agent。用什么样的用户代理进行访问，window.navigator.userAgent  Mozilla公司，拥有浏览器一些版权；compatible用的模拟器；浏览器是MSIE（MicrosoftIE）；Windows NT 5.1操作系统
	resp, err := client.Do(req) //就好比公司让req去做
	if err != nil {
		fmt.Println("http get error", err)
		return
	}
	// http 一来一回 请求完了之后会带上html交给请求体。请求体  请求头， 响应体 响应头
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("read error", err)
		return
	}
	fmt.Println(string(body))
}

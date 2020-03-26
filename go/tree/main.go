// 树使用递归的方法
// vue中，你觉得有什么应用场景？
// dif算法
//递归，把一个复杂问题，变成一个由多个相似的简单问题
package main

import ("fmt")

//矩形类 Go中
//声明一个类：type ,
type Rectangle struct {  //要声明一个矩形类 ,先声明一个结构体，结构体组成一个类
	Length int
	Width int
}
//js中表示一个属性的方法，用prototype, 火车头 prototype方法
//在GO中，直接写方法，方法名首字母也要大写，在前面在声明方法是谁的
// (r *Rectangle)是说明Area方法隶属于Ractangle这个类，r就是实例化过后的对象
// 后面的int是函数的返回值类型
func (r *Rectangle) Area() int {
	return r.Length * r.Width
}

func main() {
	//Go中使用一个类，就像一个数组一样，按照结构体声明的顺序赋值
	r := Rectangle{4, 2}  //Go的面向对象
	fmt.Println(r.Area())

}
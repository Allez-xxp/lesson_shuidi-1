package main

import (
	"fmt"
	"log"
)

//结构体 关键字 强类型
type User struct {
	Name string
	Age  int
}

type Person struct {
	Name string
	Age  int
}

func main() {
	u := User{ //用：声明的一定要使用
		Name: "hhl",
		Age:  18,
	} //声明变量并赋值，还会进行变量类型推断，此时这里是一个结构体类型
	log.Printf("hello struct %s,age is %d", u.Name, u.Age)

	// p1 := Preson 这是没问题的 但若直接var p1会报错。因为直接这样声明，内存无法给他分配空间，因为不知道类型
	var p1 Person //要带上Person,类型声明
	p1.Name = "Tom"
	p1.Age = 30

	var p2 = Person{Name: "hhj", Age: 20}
	p3 := Person{Name: "Nacy", Age: 21}
	fmt.Println("p2=", p2) //json方式
	fmt.Println("p3=", p3)
	// 应用调bug 多打一些LOG
	log.SetFlags(log.Lshortfile | log.Ldate | log.Lmicroseconds)
	// format
	log.Printf("%s login, age: %d", u.Name, u.Age)

}

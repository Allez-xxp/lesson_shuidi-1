//在js中参数很随意
//js不好的地方：没有刀柄的小刀  类型可以变来变去 JavaScript语言精粹（the good parts)
//优点：闭包 函数式编程 原型链...
//ts为js引入了类型系统
const getUserInfo1 = function(user) {//js中 常量一定要赋值，因为有值，才能决定类型
    //
    return `name: ${user.name}, age: ${user.age}` //希望参数；user是个json Object，但是用户
}
console.log(getUserInfo1());//可能就这样直接传了（什么都没传，user是undefined）
// 1.由于js代码十分不严谨，在写代码的时候会写出类似上面return中不合理的代码出来，这种的，如果user参数不传，不是警告，是报错，因为他引用了user。
// 也许用户会传：
console.log(getUserInfo1({name: "linan"}));
//名字有了，但是age没有
//2.为什么有这些会传错的可能？因为js是不会做运行前的检测的，因为它是动态语言(Java ts是静态语言)： 相比于静态语言（一个代码要运行，它开始要编译一下），js不具备这个能力，他就是一段脚本，要不运行在浏览器端，要不在命令行中，无法进行运行前的检测。
//怎么能够先编译，再运行？（编译是一个过程，运行只是一个结果）就引入了ts,编译这个过程用来检测语法
//3.当多人协作时，容易发生错误。不严格的语法带来大麻烦。

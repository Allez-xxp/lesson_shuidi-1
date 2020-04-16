//把参数里面的类型参数抽出来变成一个接口
// interface关键字
//定义函数的时候，作为开发者，函数里面嵌套函数
// const getUserInfo3 = (user) => {
// const getUserInfo3 = (user:{name: string, age: number}): string => { //用个冒号来声明，就是说这个函数返回值的类型是什么(参数的括号外面)
//     //再用个:{}把user里面有的属性，及其对象的类型也声明
//     // if(true) {
//     //     return 123; //这里返回整数，后面的return又要求返回字符串，这样的代码是不行的(js中可以)
//     // }
//     //要用好ts的类型约束
//     return `nameL ${user.name}, age: ${user.age}`
// }
//上面的写法能解决一次性问题
//如果用interface怎么用？
//比如model/memberEntity
// 类型是一个基础类型，或者在多个地方会使用到的时候，甚至对应于数据库中的某个表的时候，写一次性的就会有很多重复代码
//这时候就把他定义成一个User类
// User也不是类，user是实现了IUser一样的属性和方法的对象，js中的鸭子模型类似
//这样的，在面向对象中就通过接口来约束，通过一个接口约束一个类，这个类就会实现这些属性和方法，通过一个接口来约束实例过后的对象也会有这个方法
interface IUser {
    name: string; //接口中每一个类型声明以；结尾因为他不是一个json Object
    age: number;
}
const getUserInfo3 = (user:IUser): string => { //用个冒号来声明，就是说这个函数返回值的类型是什么(参数的括号外面)
    //再用个:{}把user里面有的属性，及其对象的类型也声明
    // if(true) {
    //     return 123; //这里返回整数，后面的return又要求返回字符串，这样的代码是不行的(js中可以)
    // }
    //要用好ts的类型约束
    return `name: ${user.name}, age: ${user.age}`
}
getUserInfo3({name: 'linan', age: 20}) //编译一下：tsc 3.ts
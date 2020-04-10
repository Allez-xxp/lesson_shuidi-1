export default  class A {  //es6的模块化
    constructor() {
        const a: string = '123' //sting是个常量 不能修改了 不能成boolead
        // a = true //这个就不能用了
        console.log(a)
        //编译到结果中
        //A是个类 能被实例化
        //再加上tsLoader ts跟js是一家 在babelLoader中改 加个类型声明 babel.js
    }
}
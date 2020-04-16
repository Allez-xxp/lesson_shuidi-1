//继续1.js
//首先一个ts文件就是一个js
//把原来的js代码放到ts会发现，他在做类型检测了
const getUserInfo = function(user :{name:string,age: number}) { //同一个目录下不定义两个一样名字的。
    //user :{} //Property 'name' does not exist on type '{}'.ts
    // user :{name: string}约束一下对象中的类型
    return `name: ${user.name}, age: ${user.age}`
}
//用它
//没传参：user
// console.log(getUserInfo());
//传一个字符串，但是ts还没能将这里检测为只能传json object,怎么让他检测？
// console.log(getUserInfo("linan"));
//用接口？才函数的参数那里声明一下:
console.log(getUserInfo({name: "临安", age: 20}));
//为什么会出现调用的人写错测试信息呢？因为在中间过程中发生了意料之外的可能，比如数据是从数据库中取的下意识与实际的字段会有误差
// ts感性写代码 java理性写代码


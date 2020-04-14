//有一个成员
//.ts文件就相当于.js文件
//interface接口 ts天生支持这个能力
//vue中 数据由data提供,然后-> vuex action ->api -> mock | node server
// ts是js的超集，就是在原有的链上，解决类型约束 ts约束未来会用的数据应该是什么类型，有什么字段，不写的话会报错
//ts将重要的数据做类型的约束，因为数据是很容易出错的 一个类应该满足什么，要先约束好
export interface MemberEntity { //定义一个这个接口
    id: number,
    login: string,  //用户名
    avatar_url: string 
}
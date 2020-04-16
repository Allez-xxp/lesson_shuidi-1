//type关键字
type IUsernfoFunc = (user: IUser) => string;

//定义接口
interface IUser {
    name: string;
    age: number
}
// const getUserInfo4 = (user:IUser): string => {
//现在的const常量 不是js那种：类型由值来决定 ts这里是可以提前决定
const getUserInfo4:IUsernfoFunc = (user) => { //加了type就能改一下了

    return `name: ${user.name}, age: ${user.age}`
}
//
console.log(getUserInfo4({name: "linan", age: 10}))
//先导入一下User (有类型要求的)
import { User} from './User'; //es2018的才会被编译(es7)(tsconfig中约定了)

const user: User = {
    name: "linan",
    age: 19,
    hobby: "coding"
}
console.log(user);
//编译之前需要安装一些东西
// yarn add ts-loader typescript -D//把typescript装到本地来 上线的时候就不用再要typescript了
//yarn add webpack webpack-cli 
//要安装到全局下：.\node_modules\.bin/webpack //执行的时候就会找到根目录下的配置文件去执行
//执行webpack(如果在全局下装的)没有就执行.\node_modules\.bin/webpack
//还能将webpack中的mode改成development 再编译就是一个大函数
//还能运行：node .\dist\app.bundle.js
// PS D:\LESSION_SHUIDI\typescript\simple-webpack-typescript> node .\dist\app.bundle.js
// { name: 'linan', age: 19, hobby: 'coding' }
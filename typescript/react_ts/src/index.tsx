// let a:number = 1; //这样就变成了ts 就是在js的基础上加上了类型基础 类型检测和类型推断是java 大型语言的优势（类型不会变来变去）
// //90%以上的bug可以因为把代码从js切到ts而减少bug
// console.log('jinglei', a);  //ts写成js就可以
// 进入路口 先把前面这两个先打包，然后把HelloComponent进入依赖，最后所有的文件都是在一个大函数中，从前到后执行
//有了依赖关系，但此时还不被webpack所理解，所以在webpack.config.js中加入.tsx
//1
import * as React from 'react'; //就跟vue的import一样,引入react //mvvm模板编译
//2
import * as ReactDOM from 'react-dom'; //负责将组件与react-dom挂载起来
//3
import { HelloComponent } from './hello'; 
import { AppRouter } from './router'; 
console.log(HelloComponent);

ReactDOM.render(
    // <HelloComponent />,
    <AppRouter></AppRouter>
    document.getElementById('root')
)
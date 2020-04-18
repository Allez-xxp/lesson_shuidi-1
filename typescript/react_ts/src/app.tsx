//输出一个组件
import * as React from 'react';
import { Header } from './components'; //要往外输出文件

//一个函数，最好对他做一个类型限制
// 类 函数 组件都要进行限制
// 有2类组件：statelessComponent(无状态组件)  stateFullComponent
// 如果只是简单地把数据编译了，MVVM没有在里面很重要，主要负责页面上的组件划分的时候就是用无状态组件
//我们之前安装了@type/react,里面node_modules/@types/react/index.d.ts有提供这个组件的类型
// 这个是一个不可以加状态的组件，而且使用函数的方法的写的，可以传参，支持一个泛型

//这是react函数式组件 根组件  
//类型声明之后，（泛型）
export const App: React.StatelessComponent<{}> = () => {  //因为这里是赋值性的，所以我们声明他是这个类型
    //要return,得至少是个jsx 不然引入这个的文件component会报错
    return (
        // <div>
        //     {/* 你好！负责导航链接，可以切换到其他页面 做一个组件的封装 */}
        //     <Header></Header>
        // </div>
        //这里是js运行区域 class是js的关键字，所以不能用class,用className（react中）
        // 这里使用的类名是我们已经在bootstrap已经打包的(webpack.config.js中)
        <div className="container-fluid"> 
        {/* 路由链接都放在这里，固定不动的。全局的 */}
            <Header />
        </div>
    )
}
//想把react也放进来
//没有进入打包的依赖关系网中，不会被打包，在index.ts中改写
import * as React from 'react'; //ts厉害的地方,可以做静态编译,ts像java js是动态的，只是一个脚本。要装一个插件
// react中最简单的组件，叫无状态组件 只是返回一个template
//组件中就是一个template的抽离 一个函数就是一个组件 
//怎么就写起了js了？react的特点
//react特点：提供MVVM响应 响应式编程，支持jsx
export const HelloComponent = () => {  //react中 函数就是一个组件 //返回html的函数就是一个最简单的组件
    //react支持声明式的模板jsx vue没有的
    return (  //jsx js in xml 声明式的模板引擎语法 react vue的区别 vue用template
        <h2>
            Hello 你好！
        </h2>
    )
}
//jsx是react首创的，只有react有 可以让你在js中写xml 所以jsx也叫js in xml可以让把js带到xml中去，有一个模板引擎的解析
// 可以帮忙把代码解析成为js的node(就是最后都是要变成虚拟节点的)
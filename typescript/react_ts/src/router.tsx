// vue的全家桶中有路由 react 中的路由是怎么样呢？
import * as React from 'react'; //有这个才能引用react的组件
import { Route, HashRouter, Switch } from 'react-router-dom'; //要安装 //一个是html形式的路由，一个是hash路由
// yarn add react-router-dom @types/react-router-dom  //类型声明文件检测@types 专门服务于tsx的
//再去 webpack.config.js 把vendor把这个也加进去
//vue-router对比学习react-router
// import { About } from './components'
import { App } from './app'  //src下加一个app.tsx文件


//只要有jsx，后缀就是tsx
//向外输出一个路由对象
export const AppRouter: React.StatelessComponent<{}> = () => { //StatelessComponent<{}>是个泛型 一个无状态的组件，需要返回一对象 里面是个jsx
    return (
        //相当于 new VueRouter()
        <HashRouter>
            <div className="container-fluid">
                {/* 声明routes数组 */}
                {/* 根路由指向根组件 */}
                <Route path="/" component={ App }></Route>
            </div>
        </HashRouter>
    )
} 
//类似这个
// new vue({
//   el: '',
//   router,
//   App
// })
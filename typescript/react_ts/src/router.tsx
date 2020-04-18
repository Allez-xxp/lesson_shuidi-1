// vue的全家桶中有路由 react 中的路由是怎么样呢？
import * as React from 'react'; //有这个才能引用react的组件
import { Route, HashRouter, Switch } from 'react-router-dom'; //要安装 //一个是html形式的路由，一个是hash路由
// yarn add react-router-dom @types/react-router-dom  //类型声明文件检测@types 专门服务于tsx的
//再去 webpack.config.js 把vendor把这个也加进去
//vue-router对比学习react-router
// import { About } from './components'
import { App } from './app'  //src下加一个app.tsx文件
import { About } from './components'; //用组件的方式做的
// import * as Components from './components";
// console.log(Component);

import { MembersPage } from './components';

//只要有jsx，后缀就是tsx
//向外输出一个路由对象
// 这个组件模板会直接输出到页面上
export const AppRouter: React.StatelessComponent<{}> = () => { //StatelessComponent<{}>是个泛型 一个无状态的组件，需要返回一对象 里面是个jsx
    return (
        //相当于 new VueRouter()
        <HashRouter>
            <div className="container-fluid">
                {/* 声明routes数组 */}
                {/* 根路由指向根组件 */}        
                {/* react-router-dom */}
                <Route path="/" component={ App }></Route>
                {/* 我们这里的Route组件就相当于router-view 占位符 */}
                <Switch>
                    {/* Switch为了解决route的唯一渲染，它是为了保证路由只渲染一个路径。只匹配一个路经就停止渲染 */}
                    {/* 如果匹配/about,就跳到abput.tsx */}
                    {/* exact修饰符，加了就会只有url后面是/后面没有东西才会展示，否则就匹配展示 */}
                    {/* 一定要加exact 不然后面的子路径就匹配不到了(因为switch匹配一个就不渲染了,但是如果没有switch那他就会把两个路径的都匹配（父和子）) */}
                    <Route path="/" exact component={ About }></Route>
                    <Route path="/about" component={ About }></Route>
                    <Route path="/members" component={ MembersPage }></Route>
                    {/* 单页应用中导航公用，其他页面由路由匹配 */}
                </Switch>

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
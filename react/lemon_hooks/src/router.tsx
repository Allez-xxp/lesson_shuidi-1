import * as React from 'react'
// 引入路由组件
// react-router-dom提供了路由组件，直接可以挂载到页面上
// 因为路由对应的path对应的组件，最后还是要render到router-view（vue中）位置上进行渲染
// 这个库就叫react-router-dom,然后路由对应的component也是要在（react-router)声明的位置上进行渲染 
// 然后router.tsx这个组件他接管整个应用，然后这个应用最外层的框架都是由他开始的，安装一下
// 使用hashrouter兼容性更好一点（switch支持网站的多个路由）
// 路由有两种一种hash一种location就是history h5的新的api
// 这种写法屏蔽了两种路由的差异性，代码的可读性更好，组件中可直接写Router,解构出HashRouter并取一个别名Router
import { Route, HashRouter as Router,Switch  } from 'react-router-dom';
//组件化，写一个Provider组件 
import { Provider } from 'react-redux'; //redux是数据流管理 与vuex有点不同  reducer就是一个纯函数 函数式编程
import { store } from './store';
import { App } from './app' //这是组件的入口 //这是首页
import { MembersPageContainer } from './components/members/';//??

// 路由接管一切，使用bootstrap做整体框架，在入口那边单独添加了打包的入口
// 当路由接管一切的时候 redux怎么做 vue中式在new Vue({})里面跟router并在一起
// 这是整个路由和配置的入口
export const AppRouter: React.StatelessComponent<{}> = () => { //函数式组件
    return (
        // 这里使用了流动式布局
        // 最外层交给redux,redux解决的问题是将状态中央化，便于管理和共享，跨组件 跨父子关系共享，
        // Provider现在变成所有路由组件的以及未来的所有页面级组件的共同的顶级组件，Provider将随时可以把状态提供给下面的组件这就是redux中provider的意义，向我们的UI 组件提供状态
        // Provider自有一个store属性，针对这个，我们创建一个store文件
        <Provider store={store}>
            <Router>
                <div className="container-fluid">
                    router
                    {/* 添加一个路由配置 是react-router中有的 */}
                    {/* 显示根组件 */}
                    <Route component={App}></Route>
                    <Switch>
                        {/* reudx 会带来组件的改变 页面组件要发生中央的状态 会发生什么 concat 
                        component -> container :connect state
                        container + statelesscomponent
                        容器组件和状态组件
                        */}
                        <Route path="/members" component={MembersPageContainer}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}

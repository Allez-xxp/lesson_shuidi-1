//输出header组件

import * as React from 'react'; //做组件，这个必须要有
import { Link } from 'react-router-dom'; //是react-router的dom化，提供关于路由的一些组件

//负责 nav ，有了这个导航，router 再加些配置path和component的关系
//header也是要向外输出的，要抛出去的都加个类型声明
// react中，一个函数就是一个组件，只要返回一个jsx
// 这个无状态组件，是个函数类型，所以后面要是一个函数
export const Header: React.StatelessComponent<{}> = () => {//直接写<{}>就像在js在默认赋参数初值，不用写p
    return ( //只要这个函数返回jsx 他就是一个组件
        // <div>header</div>
        // 使用了bootstrap的类名系统
        <nav className="navbar navbar-expand-lg navbar-light bg-white" id="navbar">
            {/* <img className="navbar-icon" src={require('../images/lemoncode.png')} alt="logo" /> */}
            <a className="navbar-brand" href="#">Lemoncode</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {/* 快捷键：li.nav-item>Link.nav-link[to="/about"] */}
                    {/* 当点击超链接的时候，执行的是js的语法 */}
                    <li className="nav-item">
                        {/* js hash  history  */}
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/members">Members</Link>
                    </li>
                </ul>
               
            </div>
        </nav>
    )
}
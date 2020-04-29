import React from 'react';
// import {} from './style.js';
import { renderRoutes } from 'react-router-config'; //要能跳转的话要加这个，
import { 
  Top,
  Tab,
  TabItem
} from './style' //静态页面最好用样式组件做

import { NavLink } from 'react-router-dom';//利用NavLink组件进行路由跳转 类似a标签

function Home(props){
    // ？？子路由为什么要这么做
    // 当有父子路由的时候 props是什么
    console.log(props); 
    // {history: {…}, location: {…}, match: {…}, staticContext: undefined, route: {…}}
    const { route } = props;
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      {/* 再使用 */}
      { renderRoutes(route.routes)}
    </div>
  );
}
 
export default React.memo(Home);

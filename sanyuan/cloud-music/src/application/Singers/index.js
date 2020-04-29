import React from 'react';
import {} from './style.js';
import { renderRoutes } from 'react-router-config'; //要能跳转的话要加这个，

function Singers(props){
    // ？？子路由为什么要这么做
    // 当有父子路由的时候 props是什么
    console.log(props); 
    // {history: {…}, location: {…}, match: {…}, staticContext: undefined, route: {…}}
    const { route } = props;
  return (
    <div>
      Singers
      {/* 再使用 */}
      { renderRoutes(route.routes)}
    </div>
  );
}
 
export default React.memo(Singers);

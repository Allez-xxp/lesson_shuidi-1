import React from 'react'; //react核心
import ReactDom from 'react-dom'; //负责在浏览器上渲染dom
// 一个App 要搭他的结构
import App from './App';


ReactDom.render(<App />, document.getElementById('app') );
// import "./app.css";

// // 使用webpack.config.js中的css模块：使用css-loader和style-loader(会把css文件打包到<style>部分)
// 如果再加上使用extract-css这个插件，就会把文件独立成为一个css文件
// console.log('welcome');
// 入口文件
import * as React from 'react'
import * as ReactDom from 'react-dom';
// import { HelloComponent } from './hello'
import { App } from './app'; //构建一下根组件的概念
//要写在外面 react hooks
// 定义了一个状态，到时候可以被共享状态的名字叫defaultUserName
// 解构两个属性
const [name, setName] = React.useState('defaultUserName');

ReactDom.render(
    // react hooks是可以超越redux  vuex的一个新特性，可以用react hooks的方式跨组件传值，共享状态
    // defaultUserName可以被组件共享状态 状态名字叫defaultUserName
    // <HelloComponent userName={name}/>,
    <App></App>,
    document.getElementById('root')
)
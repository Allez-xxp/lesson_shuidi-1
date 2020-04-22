// console.log('hello!');
// var a = 1;
// a++;//每一行都要有一个分号
// document.body.innerHTML = a;
// import后面不要分号
// 最后一行必须要再换一行的设计是出于什么原因？
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import GameContainer from './containers/GameContainer'
//react中组件分为很多种，有容器型组件-》containers

ReactDOM.render(
    <GameContainer />,
    document.getElementById('game')
)

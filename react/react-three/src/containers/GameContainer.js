import React, { Component } from 'react'
import autobind from 'autobind-decorator' //是一个库安装一下
import THREE, { Vector3 } from 'three'
import { loadModel } from '../utils/utils'
import Game from '../components/Game'

export default class GameContainer extends Component {
    constructor() {
        super()
        this.state = {
            cameraPosition: new Vector3(0, 5, 0),
            lookAt: Vector3(0, 0, 0)
        }
        // this.gameLoop = this.gameLoop.bind(this);//3.
    }
    // react lifeCycle vue的mounted事件
    componentDidMount() {
        this.mounted = true //挂载了已经
        window.THREE = THREE //把THREE挂载到全局window上
        // 加载一个3d模型出来是一个json文件，由3d设计师做出来，我们只要直接用就好
        // 有点大，
        loadModel('../../assets/sitepoint-robot.json')
        .then(geometory => {
            this.setState({ geometory })  //在这里声明的没有在this.state中
        this.requestGameLoop() //在组件挂载之后要触发这个方法
        }) //加载完成后就会得到一个geometory
    }
    requestGameLoop() {
        //在这里要让他60fps 一秒60帧，不停的刷新等下要绘制的3d图
        // 1. 用箭头函数 有性能损耗,箭头函数会重复声明，构造里不会
        // 2. 用bind
        // 3. 构造函数声明时bind
        // 4. 装饰器 autobind
        this.reqAnimId = window.requestAnimationFrame(this.gameLoop) 
        // requestAnimationFrame请求运动关键帧，由系统来决定
    }
    // 装饰器decorator
    // 会自动装饰后面的函数让这个函数内部的this一定指向当前的对象是能让类或者方法，快速具有其他功能的一个方法
    @autobind
    gameLoop() {
        // console.log(this);//指向的是undefined？绑定一下this
    }
    render() {
        const width = window.innerWidth,
        height = window.innerHeight
        const { //解构出来
            cameraPosition,
            lookAt,
            geometory //几何形状
        } = this.state
        return (
            <div>
                {
                    // jsx中用一个花括号进入js运行区，js中又能返回html,jsx的优点
                    // react3加载的一个json文件，会变成个机器人
                    // geometory?<div>加载成功</div>:'loading'
                    geometory?<Game
                    width={width}
                    height={height}
                    cameraPosition={cameraPosition}
                    lookAt={lookAt}
                    geometory={geometory}
                    />:'loading'
                }
            </div>
        )
    }
}

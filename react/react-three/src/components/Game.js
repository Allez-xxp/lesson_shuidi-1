import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Game extends Component {
    // react中 es7中新增的class静态属性声明 是react作prop检测的方法
    // 怎么配置
    // 是用来声明对方传过来的东西一定要是静态
    constructor(){
        super()
    }
    static propTypes = {
        width: PropTypes.number.isRequired, //传了的
        height: PropTypes.number.isRequired
        // dfd: PropTypes.number.isRequired,
    }
    // state = { //state也能从原来的constructor放到这里
    // }
    render() {
        return (
            <div></div>
        )
    }
}

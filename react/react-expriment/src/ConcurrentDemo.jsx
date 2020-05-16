import React from 'react';
export default class Demo extends React.Component{
    state = {
        length: 10000, //10000个方块
        num: 1 //每个方块上放一个1
    }
    updataNum = () => {
        let num = this.state.num;
        this.setState({
            num: num+1 //不能直接++
        })
    }
    // 怎么没有更新num? 好像不是100ms更新的一次

    // 加一个高频事件，耗性能的 看看动画还留不流畅
    componentDidMount() {
        // setInterval(() => {
        //     this.updataNum()
        // }, 100)
        // concurrent mode模式下，更新频率远远低于100ms
        // 这就是concurrent的优化保证了动画的流畅，动画的有限执行，执行动画后还有剩余时间，才继续执行js，动画优先
        // 尽管写100，但是还是会往后推迟，react内部的优化方案
    }
    // 渲染
    render() {
        // 把长度拿出来
        const {length,num} = this.state
        const grids =[]
        for(let i = 0; i < length; i++) {
            grids.push(
                <div className="item" key={i}>
                    {/* 10000个方块，每个里面都有一个数字1 */}
                    {num}
                </div>
            )
        }
        return (
            <div className="wrapper">
                { grids}
                {/* 数字放方块上，方块放格子里 */}
            </div>
        )
    }
};
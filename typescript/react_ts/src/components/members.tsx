import * as React from 'react';
import MemberHeader from './memberHeader'
import { members } from '../api/member/mockData';
import { memberAPI } from '../api/member';
import { ProgressPlugin } from 'webpack';
import { MemberEntity } from '../model';
import { MemberRow } from './memberRow';
interface Props {

}
interface State{ //可以用来约束组件必须满足哪些状态。数据的类型是什么 状态是一个组件最重要的
    members: MemberEntity[]  //一定要有,然后this.state.members才不会报错了
}
// 内部有数据 就是vue中的data-》react的state
// extends继承自一个父类，这样就成为了一个组件，这个组件可以使用state
// React.Component<{}>这个其实就是react的另一种组件StateFullComponent
export class MembersPage extends React.Component<Props, State> {
    constructor(props) {
        super(props); //继承一个类，把父类的构造函数执行一下
        this.state = {  //这里就是组件的状态，组件有：状态，模板，css组成
            //相当于vue的data react没有api约束
            // react一切皆编程语法
            members: []
        }
    }
    // 生命周期
    public componentDidMount() {
        //在这里发出请求
        //希望提供一个fetch api提供数据
        //ts虽然多写了写代码，但是会减少很多调试，反而省时间
        memberAPI
        .fetchMembers()
        .then((members) => { //.then要自己加一个类型约束，让他是Promise//member的格式要满足api/member/mockData里面的格式
            console.log(members);
            this.setState({
                members  
            })
        })
    }

    //一定要有的，且唯一的函数：
    public render() { //必须实现的接口
        //不能为空，应该是一个react的结点，要加return
        return (
            <div className="row">
                <h2>Members Page</h2>
                <table className="table">
                    <thead>
                        <MemberHeader />
                    </thead>
                    <tbody>
                        {
                            // react中没有v-for
                            // 要加上interface State
                            // 要解决MemberRow可以通过Props进行检测，他接受key类型是members类型，实现数据能显示到页面上
                            // 要写一个组件，是State还是react.components组件？里面是否需要react constractor生命周期还有render
                            this.state.members.map(member =>  //每一项交给MemberRow执行
                            <MemberRow
                              key={member.id}
                              member={member}/>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

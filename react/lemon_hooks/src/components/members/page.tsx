import * as React from 'react';
import { MemberEntity } from '../../model';

interface Props {
  memers: MemberEntity[],
  fetchMembers(): void;
}

// 泛型 泛指它内部的重要数据类型，作为一个组件它内部的重要数据类型，一个是外界父组件传的props,还有一个是内部的状态
export class MembersPage extends React.Component<Props, {}>{
  constructor(props) {
    super(props); // 继承
    this.state = { members: []} //只拿了Pagecontainer的一个分支members
  }
  // 公开属性 ts 前面要加public
  public componentDidMount() { //生命周期函数
    console.log('ddddd');
    this.props.fetchMembers();
  }

  public render() {
    return (
      <div className="row">
        <h2>Members Page</h2>
        <table className="table">
            {/* <thead>
                <th>ID</th>
                <th>Login</th>
                <th>Avatar</th>
            </thead> */}
          <tbody>
            {
              // 为什么还报错 加在泛型那里
            //   也就是外面穿过来的props一定有memer类型
              this.props.memers
            }
          </tbody>
        </table>
      </div>
    )
  }
}
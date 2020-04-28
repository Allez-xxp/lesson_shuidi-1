
import * as React from 'react';
import { connect } from 'react-redux';
import { MembersPage } from './page';
import { State } from '../../reducers';
// MembersPage是  stateless component 
// container  负责5 connect   store 
// connect 对UI组件的装饰    
// connect 向 provider借状态  某些状态
// 在Provider和component= {MemberContainer}之间搭个桥，然后就能拿到Provider里的{store}
// connect是一个函数 还会生成一个函数，生成后立即执行，将容器式组件放进去
const mapStateToProps = (state: State) => ({ //只读操作
  // ts 除了准确性外 编程的简易性  类型的 建议写“.”的时候直接有接口中的东西跳出来
  // ts 不难， 也没有浪费时间多些代码， 减少了错误， 代码写起来， 类型的补全更方便
  members: state.members,
})
// action
const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => {
    // connect concat   太大区别的 
    // connect由 react-redux  提供
    console.log('action');
  }
});

// 相当于vuex  mapGetters  mapActions 只不过这里使用connect来包装，把MemberPage这个ui组件包起来
// context
export const MembersPageContainer = connect(
  mapStateToProps,// 借状态函数
  mapDispatchToProps // 映射 action 
)(MembersPage);
import { fromJS } from 'immutable';

// 是个函数，负责返回recommend的状态
// 状态不可改变，要改，改变了就返回全新的状态
const defaultState = fromJS({
    bannerList: [],
  });

// 生成一个新的，提供一个不可变数据流，是一旦变就返回新的
console.log(defaultState, '--------');

// immutable的思想
export default (state = defaultState) => {
    return state
}
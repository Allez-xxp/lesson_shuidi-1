// reducer是返回状态的函数，对状态改变的约束的 vue中是mutation的概念
// combineReducers是reducer的常见做法，意义是第一步，将给各个模块的reducer汇合成一个reducer 就是conponce合并

import { combineReducers } from 'redux-immutable';
// 在大型应用中，每个模块的reducer建议放到application中（组件模块下）
import { reducer as recommendReducer } from '../application/Recommend/store/index';
// recommend是一个路由级别组件，可能成为项目核心部分， 数据流管理部分store
// 数据流管理跟ui模块（组件模块）在一起组成业务模块


export default combineReducers({
    // 之后开发具体功能模块的时候添加reducer
    // recommend是我们的一个模块
    recommend: recommendReducer,
});
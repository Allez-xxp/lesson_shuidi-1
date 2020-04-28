import { combineReducers } from "redux"; //组合所有的模块
// 进行modules模块化
import { membersReducer } from './members';
import { MemberEntity } from "../model";

// redux需要提供一个接口，这个接口描述reducer有哪些
// 这个State去交给单一状态树store.js中的store,在Store的泛型里面说reducer函数有哪些，每个函数叫什么名字已经返回值是什么
export interface State {
    // 约定我们一定会有一个叫members的reducer函数，他的返回值一定是MemberEntity[]类型
    members: MemberEntity[]
}

// 这个相当于vuex modules
// 把一个文件一个reducer函数
// createStore返回一个单一状态树，将state由这里提供，这里就相当于我们的状态树中其中一个分支
// 这个是redux进行数据管理的一个方式，就是把很多个reducer合并到一起
export const state = combineReducers({ //传递一个json object
    members: membersReducer,
})
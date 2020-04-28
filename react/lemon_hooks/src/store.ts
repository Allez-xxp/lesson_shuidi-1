// redux mini版 怎么让项目运行起来
// 在vue中这个时候会new一个Vuex.store
// createStore提供一个单一状态树 Store一定是一个单一状态树
import { Store,createStore } from 'redux';

import { state, State } from './reducers'; //建一个这个文件,这里面可以一个文件一个模块，就像vuex的模块化

// 这里相当于vuex的 单一状态树，为组件提供状态以及状态的修改
// 这里面的状态由中央管理，通过Provider提供给所有组件，然后connect一下就能把数据拿出来

// 约定一下他是一个单一状态树，再加泛型支持 约定状态树提供的reducer一定要有membersReducer
// 泛型 泛指里面的数据的类型
export const store: Store<State> = createStore(
    // store要有一个状态 由各个模块合并而成
    state
)
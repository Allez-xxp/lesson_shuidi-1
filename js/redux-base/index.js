let a = 123;
//这个a就算应用的状态
/**
 * return (
 * <div>{{a}}</>
 * )
 * 跟应用息息相关，都算状态
 * state={
 * b:46
 * }也是
 * 
 * redux/vuex 都要设计一套修改state流程 state:dispatch->action->mutation->state
 * 
 * 要尽量避免全局部变量
 * 在任何模块中都能获取（get)这个行为没关系，但是如果是修改，在任何模块中都能轻易把全局变量改掉，这是十分危险的
 * 
 * 状态管理做的事：
 * 在中间再加些步骤，不是随便就能改的，要经过这些步骤，中间也能观测到要修改的
 * 
 * redux是怎么思想设置中间的每个环节的
 */
// 创建一个状态的仓库
const {
    createStore
  } = require('redux');

let globalState = {
    // 如果把项目的整个状态都放在这
    home:{},
    login:{}
    // 全局化，任何组件中都能拿到这个组件 直接globalState.home就能拿到
    // 不需要用mapGetters, mapActions什么的
}

//1.reducer:纯函数=》state 无副作用，同样的输入有同样的输出
// 变成一个纯函数的返回值，由纯函数（reducer：考虑state默认值，考虑后续state的变化）-》state
// 规定了两个参数 state:上一次的state action:这次dispatch的action
function reducer(state, action){
    console.log(action.type);
// // 生成state得过程完全要自己控制
//     return {
//         home: 'home state',
//         login: 'login state'
//     }
// 自己控制 怎么生成新的state有返回值控制,控制默认值，返回值
// state是上一次的state，第一次是undefined；
    console.log('达到reducer了',state, action); //会先有一个action init
    // 2.3
    if(action.type === 'DELETE_HOME_STATE') {
        return {} //返回全新的值
        // 为什么不是直接
        // delete state.home
        // return state
    }
    //后续的变更，还要action 和dispatch的配合
    if(action.type === 'CHANGE_HOME_STATE') {
        return { //返回全新的值
            home: action.home
        }
        // 为什么不是直接
        // state.home = action.home;
        // 我们要，不可变，immutable 不在原来的基础上修改
        // 每次变更都返回一个全新的值
    } 
    //一个type都没命中就返回默认值
    return {
        home: 'home state',
        login: 'login state'
    }
}
// 2.要更新state就要发起一个action 是js中的一个对象
// -type指明发起action要干什么 增删改查？(type必须有，用它来指明)
// -其余是自定义的
//action也是自己定义的一个对象
let action = {
    type: 'CHANGE_HOME_STATE', //type是整个应用唯一，不重复的
    home: 'home state 1', //如果要改home状态，这里就写要改的home信息,
    a:1,
    b:2
}
//3.最终为了把action和state串联起来，必须开发一个redux 发起一个action才能把state修改 
// action->redux->state
// cnpm i redux -S装redux
// 发起一个action ->dispath；获取状态-》getState;

// vue中生成默认值：
// state: {
//     a:[],
//     b:[],
//     home:'home'
// }
// redux中不一样
//第一. 通过createStore api生成store，由reducer->state
// 生成state得默认值
let store = createStore(reducer);
// 发起变更流程，要先发起action
//用dispatch->触发action
// 自动去到下一步（reducer）
//修改默认值
store.dispatch(action);

//再来：删掉home这个状态,不带别的信息
// 2.1.
let action1 = {
    type: 'DELETE_HOME_STATE'
}
//2.2
// dispatch 两方配合
// action+reduce


console.log(store.getState());//好像没被改掉，为什么？
// 第二，视图层（view)用户触发按钮触发action
// 第三，action->reducer两个要配合

// 浅复制
let a = {a:1};
let b= {...a}; b.c = 12;
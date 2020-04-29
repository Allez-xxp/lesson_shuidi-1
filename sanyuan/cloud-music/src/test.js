const { Map, fromJS } = require('immutable');
// immutable不可变数据流管理学习
// 但凡被创建绝对不可改变

// immutable中的Map方法
const map1 = Map({a: 1, b: 2, c: 3})
const map2 = map1.set('b', 50);
console.log(map1);
console.log(map2);
console.log(map1, map2);
//发现我们的map1没有被改变

// es6中有一个深浅拷贝的问题

// 对于一个对象的赋值，是一个引用式赋值
// map2没有

// react中有一个思想状态也是组件的一部分 一个状态-》另一个 那之前计算出来的函数状态值叫oldState,不应该被改变
// 应该生成一个新的newState，不应该是引用式赋值
// 新的应用状态对应新的对象用immutable来生成，这样数据操作就更安全
// vuex不是这样处理的，redux中是reduce函数，未来要修改的时候，最好用新的独立的对象 state = defaultState

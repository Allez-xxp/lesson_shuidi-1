## redux是用来进行状态管理的
TJ是koa得作者
Dan Abramov是redux写出来的
什么是状态管理，有了这个有什么好处？
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

type是整个应用唯一，不重复的

redux是js的状态管理的库
redux->reducer->state;
dispatch->action->reducer

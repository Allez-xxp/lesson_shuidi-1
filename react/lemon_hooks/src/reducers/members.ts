// 负责向外提供一个reducer函数，这个函数会通过reduce操作返回唯一的当前状态

// redux跟vue是有区别的，vuex繁琐，分四大家族states getters mutations actions
// redux为我们提供了reducer（纯函数，没有副作用的函数） 
// 向外输出这个函数 通过函数的返回值提供状态
// 这个模块要做什么？members的数组状态
// reducer函数是一定要进行reduce操作的
// ts要做事，这里state是关键量，要对他进行类型约束
import { MemberEntity } from '../model';

export const membersReducer = (state:MemberEntity[] = []) => { //初始状态[]
    return state;
}

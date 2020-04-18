//输出一个函数
import { members} from './mockData';

import { MemberEntity } from '../../model';
const fetchMembers = ():Promise<MemberEntity[]> => {
    //引入一下假数据
    // return members不能直接这样写,写上类型
    return Promise.resolve(members);
}
export const memberAPI = {
    fetchMembers
}
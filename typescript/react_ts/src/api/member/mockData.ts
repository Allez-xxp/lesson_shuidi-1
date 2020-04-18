//es6
//ts厉害的地方
import {MemberEntity} from '../../model'
//MemberEntity[]
export const members: MemberEntity[] = [  //添加类型约束，按约定好的类型和字段写//数组中的每一项是一个member所以要写成数组[]
    {
        id: 212412,
        login: '临安',
        avatar_url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2734134430,1646644745&fm=26&gp=0.jpg'
    },
    {
        id: 966668,
        login: 'linan',
        avatar_url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2734134430,1646644745&fm=26&gp=0.jpg'
    }
]
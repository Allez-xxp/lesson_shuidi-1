import React from 'react';
// import { fetchData } from '../../utils/fetch';

// 会接收我们map中传过来的东西
// 一个组件
export const TagItem: React.FC<{}> = (props) => {
    return (
        // 传了tadObj过来是我们的组件中传的参数名字，是我们的对象
        <div className="flexRow">
            {props.title}
        </div>
    )
}
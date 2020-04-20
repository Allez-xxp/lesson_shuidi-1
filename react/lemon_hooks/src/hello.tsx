import * as React from 'react';

//给某人打招呼，
export const HelloComponent = (props) => { //props这是statalessComponent可以做的事
    return (
        <h2>Hello user: {props.userName}</h2> //没传参数，但也没报错 js的不严谨性
    )
}
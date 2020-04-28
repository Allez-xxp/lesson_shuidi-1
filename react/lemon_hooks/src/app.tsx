import * as React from 'react';
// import { HelloComponent } from './hello'
// import { NameEditComponent } from "./nameEdit"
import { Header } from './components'; //头部包含我们的链接，连接导向路由进行数据请求

export const App = () => {
    // <></>是fragment
    // name是我们的状态的值 setName修改state
    // const [name, setName] = React.useState('initName'); //react hooks是一些react新的函数，改变组建的编写方式和redux的新方式
    // const setUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(event.target.value);
    // };
    return (
        <div className="container-fluid">
            {/* <HelloComponent userName = {name}/> */}
            {/* 修改状态 */}
            {/* <NameEditComponent userName={name} onChange={setUsernameState} /> */}
            <Header />
            {/* 入口这边有了 然后去router中继续 */}
        </div>
    )
}
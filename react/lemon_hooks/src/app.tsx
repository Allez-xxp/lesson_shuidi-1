import * as React from 'react'
import { HelloComponent } from './hello'
import { NameEditComponent } from "./nameEdit";

export const App = () => {
    // <></>是fragment
    // name是我们的状态的值 setName修改state
    const [name, setName] = React.useState('initName'); //react hooks是一些react新的函数，改变组建的编写方式和redux的新方式
    const setUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    return (
        <>
            <HelloComponent userName = {name}/>
            {/* 修改状态 */}
            <NameEditComponent userName={name} onChange={setUsernameState} />
        </>
    )
}
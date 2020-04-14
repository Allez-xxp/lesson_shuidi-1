//输出一个组件
import * as React from 'react'

export const App = () => {
    //要return,得至少是个jsx 不然引入这个的文件component会报错
    return (
        <div>
            你好！
        </div>
    )
}
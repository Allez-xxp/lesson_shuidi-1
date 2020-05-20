import React from 'react';
import { Query } from 'react-apollo'; //是用来对graphql进行查询的
// 定义查询的标签用的
import gql from 'graphql-tag'; //解析GraphQL 查询必要依赖

// 前端定义他要的接口是什么。后端有很多标准化的接口，但是前端也有决定权
// QUERY_TODO这个就是一个graphql-tag
// 等下会在后台给一个默认的数据源
// 会给我们提供一个TodoList查询接口
// 定义了一个标签，到底查哪一类型的接口，用了gql来定义
// 查询的名字叫TodoList 限定我们只要的东西
// 请求一个grapgql查询，他提供一个axios
const QUERY_TODO = gql`
{
    TodoList{
        content
        id
        checked
    }
}
`
// 要连接了服务器才会有数据

// 函数组件 一切皆组件化
// Query组件的query属性的值为gql函数，它是graphql查询语句。
// 拿到数据后就能去渲染
const TodoList = () => {
    return (
        <Query
        query={QUERY_TODO}>
            {/* js运行区 */}
            {({loading, error,data})=>{
                if (loading) return <p>loading</p>
                if(error) return <p>error</p>
                return data.TodoList.map(todo => {
                    <li>${todo.id}: ${todo.content}</li>
                })
            }}
        </Query>
    )
    
}

export default TodoList;
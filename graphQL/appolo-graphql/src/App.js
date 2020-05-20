import React from 'react';
import { Card } from 'antd';
import "antd/dist/antd.css";
import { ApolloProvider } from 'react-apollo'; //提供一个组件// react和graphql的连接体//apollo是应用层
import ApolloClient from "apollo-boost";//用来实例化客户端//boost就是启动//创建Apollo客户端，它用于与GraphQL服务器交互。
import TodoList from './components/TodoList'; //组件化，单独放出去

// 它跟服务器端的客户端连接起来之后向组件提供ApolloClient标准后的接口化数据
const client = new ApolloClient({
  // 接口地址 传一个uri就能跟服务器端连接起来
  uri: 'http://localhost:3001/graphql' //来自于服务器端，基于原来的koa在原有的接口上封装一层graphql,//uri

})

// Apollo是graphql的一个框架
function App() {
  return (
    // 在index.js，集成ApolloProvider到React app
    // 会把apollo客户端放入到React app的上下文里，在组件树的任何地方都是可以获取到apollo客户端。
    // 会跟服务端的graphql数据连接，然后能使用里面的数据
    // 发起连线
    <ApolloProvider client= {client}>
    <Card
    style={{width: "600px", margin: "100px auto"}}>
      <h1>Grapgql demo</h1>
      <TodoList></TodoList>
    </Card>
    </ApolloProvider>
  );
}

export default App;

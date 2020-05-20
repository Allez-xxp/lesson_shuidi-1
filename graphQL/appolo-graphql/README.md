## graphql继续 新的接口语言
前端graphql -> 介入 api开发 取代restful
好处：可以由前端来定义接口需求 是由Facebook开源的 由前端根据ui的需求精准的定义需要什么数据 前端定义schema
react+graphql 讲述graphql实战
根据ui需求精准定义接口 提高项目接口的质量


mounted 中发送axios 请求的时候交给graphql,他又在服务端 要根数据库联系起来
数据库读出来数据之后会有一个graphQLHTTP（基于koa或者express搭建一个）  /graphql 进行查询或者修改
后端把数据查出来，前端发送一个定义好的praghql请求，

适合大公司 (server)API为各条业务线提供api服务的时候

1-》n的关系，后端一个接口，前端不同的需求使用
graphql对接口自定义
src/App.js
yarn add antd

前端现在说的都是graphql,后端才说restful,前端restful已经过时了

react中怎么提供graphql?
graphql提供的是数据
redux

https://majing.io/posts/10000009231249
apollo-boost：这个包包含了搭建Apollo客户端需要的所有东西。
react-apollo：集成React的视图层
graphql-tag：解析GraphQL 查询必要依赖
graphql：用于解析GraphQL 查询

现在把上面的新建的apollo客户端集成到React应用里。react-apollo提供ApolloProvider组件，ApolloProvider类似于React的context provider。它会把apollo客户端放入到React app的上下文里，在组件树的任何地方都是可以获取到apollo客户端。
```js
import { ApolloProvider } from 'react-apollo'; //提供一个组件// react和graphql的连接体//apollo是应用层
import ApolloClient from "apollo-boost";//用来实例化客户端//boost就是启动//创建Apollo客户端，它用于与GraphQL服务器交互。
```
react自身占用的是3000端口

Query组件的query属性的值为gql函数，它是graphql查询语句。

Query组件的子节点也是一个函数，它用来决定怎么渲染graphql返回的数据到UI。这个函数有三个参数：loading，error，data。当graphql返回数据后，会传给data参数用来渲染UI。

安装
yarn add apollo-boost react-apollo
npm i graphql graphql-tag 
以前的请求方法:
/posts/:1 GET 这个叫restFul

App.js中，在根组件上我们使用 全局 使用ApolloProvider,与服务器端的http://localhost:3001/graphql，3001端口的graphql连线，
apollo是graphql的一个开发框架

新建server
npm init -y
添加mock文件
server/mock/index.json
添加server/index.js

安装yarn add koa apollo-server-koa @koa/cors

util.js

运行一下
nodemon index.js

url的设计，
- 输入一个url发生什么？
- url设计 restful 一切皆资源 url后面加名词 + http动词 restful理念可以抽象的达到网站向用提供一切资源的抽象
不过就好像花甲一样，前后端的接口虽有接口文档（swagger + egg.js），但是后端搞得不干净，吃起来有沙子，把接口的定义权力交给前端就干净多了，不会有多余或者没给的数据，由facebook推出graphql,restful成为了历史。
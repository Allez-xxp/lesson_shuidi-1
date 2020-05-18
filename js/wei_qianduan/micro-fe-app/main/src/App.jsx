import React,{
  Suspense, lazy
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const MicroApp1 = lazy(() => System.import('http://127.0.0.1:8080/Pay.js')) //用lazy包一层微应用，返回一个Promise就行

function Pay() { //pay的代码不应该在这里写，应该去引入一个远程的pay资源，不关心pay怎么实现的，只关心上线后就是一个url,引进来后就是主营用的一个组件
    // System.import('http://127.0.0.1:8080/Pay.js') //里面写远程的端口 live-server出来的
    // 用fetch('.js'),xmlhttprequire('.js')也可以把远程的js拉下来 然后执行
    // 执行js，看它导出了什么，就能拿到这个模块运行后拿到了什么
    // pay得是一个组件啊,react的新东西，两个api Suspence(悬念，就是不知道的),lazy
    return (
      <Suspense fallback="loading...">
      <MicroApp1></MicroApp1>
      </Suspense>
    )
    
    
}

// 因为组建会有一个懒加载，要有加载的一个过程，Suspence这个组件，提供一个fallback 回退能力,代表组件正在加载中，组件没有内容是回退到...
// 组件的引入就要靠lazy来引用，包一层，然后返回一个Promise,System语法刚好返回一个Promise，所以直接挪进去

// 怎么引用一个远程的组件？
// 先去微应用 开发一个pay的组件

// 整个主应用结构搭好了
export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/pay">Pay</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/pay" component={Pay}/>
        </Switch>
      </div>
    </Router>
  );
}
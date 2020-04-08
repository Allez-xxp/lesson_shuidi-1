import React, { useState } from 'react';
import logo from './logo.svg'; //是图片 webpack中的引入方法
import './App.css';

//函数组件内部的状态要用一个方法来生成useState
//类组件怎么做的？

//定义类组件 需要定义一个render 用来渲染
//放到标签上的都是props
class Header extends React.Component {
  //有个属性叫做state有个方法叫做render
  state = {
    list: [
      'A', 'B', 'c'
    ]
  }
  render() {
    const { color }= this.props;
    const { list }=this.state;
    //要求是个对象 里面表示是个js中的对象，外面的{}说明有个值;与vue中的{{}}不同
    //react里面也要求同级的元素 外面要用一个元素包起来 但这样强加一个div很没有意义，改进 写个空标签
    //其实就是叫<React.Fragment></React.Fragment> === <></>
    return (
      <React.Fragment>
      <>
      <header style={{
        color
      }}>
        头
        {
          list.map((char, i) => (
            <h3 key={i}>{char}</h3>
          ))
        }
      </header>
      <div>头</div>
      </>
      </React.Fragment>
    )
  }
}

//用函数写的一个组件，react中就是以函数来写组件
function App() {
  //jsx语法 vue也可以写这种语法
  // {logo}===vue的{{ logo }}
  let book = 'js book'; //变量放到html中就用{}
  //数组 v-if v-for
  //react中怎么让list变成state呢？
  let list = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
  ];
  //生成state
  //默认值就是state  setListState是方法，
  //相当于做了一个解构
  //react16新更新的 函数中才有state的方法
  //要更新listState这个状态只能根据配套的方法
  const [listState, setListState] = useState(list)

  let hasData = list.length > 0;  //就是有数据，有就渲染，没有就不渲染
  //列表的渲染，可以用jsx，会自动展开数组，直接放个数组就行
  //怎么让每一项都独占一行，可以包一个li
  let arr = [<li>0</li>, <li>1</li>, <li>2</li>];
  //直接放list不行，因为展开每一项是个对象，直接放在标签中是不合法的，jsx不会自动处理对象类型
  //自己把list处理成react可以处理的东西：字符串，html标签...
  //我们要实现每一项都用li标签包起来，习惯用map来处理(映射的状态)
  //习惯性的把html元素用小括号包起来
  const listEle = listState.map((person, i)=>{
    // 要组合两个（first和last),要拼接就要用{}包起来
    // 需要加一个key key是啥，出现相同的key会怎么样
    // key是用来区分 页面可能会更新，就是说假设三秒后把最后一项删掉了
    // 是否要把前面没变更的重新销毁再重新渲染呢？用key来区分前后两次的结点可不可以复用（要不要销毁，再重建）
    // 两次渲染页面的时候，如果key相同就说明结点时没有变化的，只要做一个移动的操作，不用再重新销毁
    return (
      <li key={i}>
        姓名：{person.first}-{person.last},多久：{person.passed - person.year};
      </li>
    )
  })

  //三秒过后删掉
  //不用list来渲染了 用listState
  setTimeout(()=>{
    let newData = list.slice(0, list.length - 1); //就是从第一项截取到倒数第二项
    setListState(newData);  //react数据的更新是利用配套的方法得
  },3000)
  // console.log(list);  //map完，输出来的数据就是一个虚拟DOM(react.element)
  //是转换成虚拟DOM的，没转之前就是li包起来的数据，现在页面上看不到li是因为react渲染了
  // vue中叫data; this.data.list.splice() //删了，页面就会有一个更新
  // react中叫state

  //react引入组件，首字母是header
  //vue中引进来组件import后还要component一下 我们直接定义
  //react除了用函数，还能用class方式定义组件
  return (
      
      <div>
        <Header color="red"/>
        { book }
        { hasData ? listEle: <em>暂无数据</em>}
      </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

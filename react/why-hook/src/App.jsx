import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
// 把js结尾的文件改成jsx结尾的，这样就有emit语法了
// 父组件通过props传递数据给自组件，子组件通过$emit调用父组件中的方法，并传递数据
// 从参数上解构x,y（props)
// function A({date}) {
//   // 调用自定义hook,他返回x,y坐标，返回的是一个对象
//   const {x, y}= useMouseInfo(); //解构出来
//   return (
//     <div>
//       x: { x }
//       y: { y }
//       date: {date},
//     </div>
//   )
// }

// 关于useEffect hooks的一个坑
// 像每隔一秒启动一次hook,输出当前时间，hook会设置当前时间，然后我们要输出的就是这个时间
// 时间不会动？？
function A() {
  // 调用自定义hook,他返回x,y坐标，返回的是一个对象
  const {x, y}= useMouseInfo(); //解构出来
  const [date, setDate] = useState(new Date);
  const [time, setTime] = useState('');
  function hook() {
    // setDate(new Date());
    // 发现date不会变，但是定时器是在走的
    // 这是因为这里拿到的时间他永远是同一个固定的时间，
    // hook内部拿到的date是固定的，不是每个一秒重新拿一次新的，为什么？定时器一直在动，同时我们也在不停的setDate
    // 这就是capture value 快照
    // hook在渲染的时候，拿到的都是当前的state，形成了一个快照，保留下来了当前的state
    // 不用状态里面的date,用最新的时间
    let day = new Date()
    setDate(day.toLocaleTimeString());
    // console.log(date.toLocaleTimeString())
    // setTime(date.toLocaleTimeString());
    console.log(day.toLocaleTimeString())
    setTime(day.toLocaleTimeString());
  }
  // 
  useEffect(()=>{
    let id = setInterval(()=>{
      hook()
    },1000)
    //组件取消是把定时器清空
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <div>
      time: {time}
      x: { x }
      y: { y }
      {/* date: {date}, */}
    </div>
  )
}
// function B({x, y, date}) {//props的解构就不需要了
function B({date}) {
  // 调用自定义hook,他返回x,y坐标，返回的是一个对象
  const {x, y}= useMouseInfo(); //解构出来
  return (
    <h2>
      x: { x }
      y: { y }
      date: {date}
    </h2>
  )
}
// 高阶组件
// 想让这两个组建的位置都能被获得 公共逻辑
function WithMosuInfo( Com ) { //这里面接受一个组件
  class WithMouseComponent extends React.Component {
    // 这个组件内部是放公共逻辑的
    // 可以复用的部分，就是这里，x, y，记得初始化
    state = { 
      x:0, //要有默认值
      y:0
     }
    //生命周期
    componentDidMount() {
      document.addEventListener('mousemove',(e)=>{
        // 类组件还要注意this的处理, 箭头函数this是指向声明的地方,不是调用的地方
        this.setState({
          x: e.clientX,
          y: e.clientY
        })
      })
    }
    render() {
      // 自己合并props
      const props = this.props;
      return ( //渲染的就是传进来的组件，只不过在里面把x坐标y坐标传过去，这个是这个高阶组件处理的可以复用的逻辑
        <Com 
        x={this.state.x}
        y={this.state.y}
        {...props}></Com>
      );
    }
  }
  return WithMouseComponent //返回一个组件
}
// A组件交给高阶组件包裹一层，他就具有x,y这两个状态了
// const Amouse = WithMosuInfo(A)
// 包装地狱，嵌套在一起
// const Amouse = Withtime(WithMosuInfo(A))
// const Bmouse = Withtime(WithMosuInfo(B))
// 使用自定义hook

//如果还有一个需求转化为本地的时间
function Withtime(Com) {
  class WithTimeCom extends React.Component {
    
      state = { 
        date: new Date().toLocaleTimeString()
       };
    
    render() {
      const props = this.props; //把之前的props也加上，用一个...展开符
      return (
        <Com date={this.state.date} {...props}></Com>
      );
    }
  }  
  return WithTimeCom;
}
// date没出来？涉及一个props的问题，第一次调用WithMosuInfo传了props，之后调用Withtime又传了一个props
// 先后给了两个props,但实际上没办法做一个自动合并props的，只拿到了里面包裹的传过来的props
// 要自己合并

// 有了hooks就有了一个全新的逻辑组合与复用，怎么用hooks实现逻辑复用？
// 内置useState useEffect ...
// 自定义hook hooks的精髓，解决逻辑复用
// 自定义hooks以use开头是一个规则
function useMouseInfo(){
  // 两个状态
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  // 一个didMounted生命周期
  useEffect(()=>{
    document.addEventListener('mousemove',(e)=>{
      setX(e.clientX)
      setY(e.clientY)
    })   
  }, [])
  // hooks会有一个第二个参数，hooks的依赖，依赖变了的话hooks(useEffect)会重新执行一遍，这里写[],让他的值固定不变，也就是每次只渲染一次
  // hooks只执行一遍，就相当于didmounted
  // 怎么使用hooks?hooks只能在函数组建中使用，不能再class组件内部使用
  // 试用一下，直接在组件内部调用自定义hook

  // 最后要返回的也就是x,y的状态
  return{ //这里是大括号
    x,
    y
  }
}
// hook中一旦里面的状态变了，页面值会重新渲染
// 原生js中不会
// function foo() {
//   let x = 1, y = 9;
//   return {
//     // x,y值变了之后页面不会重新渲染
//     x,y
//   }
// }

function App() {
  return (
    <div className="App">
      {/* <Amouse />
      <Bmouse /> */}
      <A ></A>
      <B></B>
    </div>
  );
}

export default App;

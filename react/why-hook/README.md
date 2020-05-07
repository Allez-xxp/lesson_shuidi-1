什么是逻辑复用 组件的鼠标移动都需要知道坐标 高阶组件使用了 把公共的逻辑抽离到高阶组件中 谁想要x y坐标 使用这个函数就行  存在公共逻辑部分的时候 用高阶组件，把公共部分抽离出来 逻辑组合与复用 =》多个组建之间有公公逻辑的时候 逻辑复用

vue3.0也是有了conplete api 有了逻辑复用的api
设计动机
class组件有什么缺点，react hooks有什么优点？
wrapper hell 包装地狱
huge components 组件大，复用难 重构难
confusing classes 类让人难以理解 类中的this指向可能会变
想复用组件，往往会造成包装地狱，组件一层套一层
什么是包装地狱？
用一个例子讲
什么是组件的逻辑复用 
高阶组件
例子：
两个组件的鼠标移动都需要知道相应的坐标 使用高阶组件 把公共的逻辑抽离到高阶组件中 谁想要x y坐标 使用这个函数传给这个高阶组件就行  存在公共逻辑部分的时候 用高阶组件，把公共部分抽离出来 逻辑组合与复用 =》多个组建之间有公共逻辑的时候 逻辑复用
这就是react中的高阶组件
vue中采用Mixins

effect 副作用 网络请求，console.log MathRandom Date...
纯函数
useEffect是什么？
react的生命周期
15
1. 组件第一次初始化挂载
start -> getDefaultProps->construct(getInitialState)->componentWillMount->render->componentDidMount（挂载完毕）
然后页面上就有信息了
然后
用户要操作，就会引起页面的更新
2. props改变
3. state改变
最后组件卸载

最新 16
横向
1. “Render 阶段”
纯净且不包含副作用。可能会被 React 暂停，中止或重新启动，所以不把网络，等有副作用的放在这个周期，
2. “Commit 阶段”
可以使用 DOM，运行副作用，安排更新。
挂载时 更新时 卸载时



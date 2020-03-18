//vuex是单一状态树，单一就是我们的入口文件main.js中store只有一次实例化的机会(new vuex store),
// vue中仓库只能有一个，因为这样我们的状态就不会混
一份数据只有一个状态，这就是单一状态
// 树？modules来了之后，树的概念就来了，state就是状态的根节点，modules中的就是叶节点
namespaces命名空间
声明了这个，树根下一个节点的命名，枝桠上的结点
this.$store.dispatch('products/getAllProducts') //这里利用到了命名空间，所以可以放在模块的文件中，不用放在store.js

console.log(this.$store.state.productsu);//"[__ob__: Observer]"
订阅发布者模式
组件和状态树之间
Observer是观察者，状态树发生改变之后，组件跟着变，是可以被监听，可以被订阅的对象

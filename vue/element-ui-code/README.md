# element-ui源码分析
1. element-ui的源码在哪里？
node_modules中找，组件代码再package下面，但是又是在这边写，切来切去麻烦，到GitHub去
2. GitHub中的element-ui打开
https://github.com/ElemeFE/element/blob/dev/packages/alert/src/main.vue
分析源码以学为主，边看代码，边实现一下
3. 怎么写出来element-ui,在不安装element-ui的基础上将Vue.use(ElementUI);import ElementUI from 'element-ui';注释，css先保存，我们只专注于vue
报错：
[Vue warn]: Unknown custom element: <el-alert> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

import ElAlert from './components/ElAlert.vue'

export default {
  name: 'App',
  components: {
    ElAlert  //导入了组件要记得写一下，然后建相应的文件ElAlert.vue
  }
}

css文件引入留下，将vue.use以及elementui注释。
- 学到代码风格
属性一行一个，利于代码可读性
- :class用法 
[]数组形式，表示这里有多个动态样式要输出，第一个是typeclass,他就是一个变量，冒号后面是js区域，每一项都是可以动态输出的，双引号里面是会运行的，这个变量在computed中计算得出
computed属性，根据props在计算
[typeClass,center ? 'is-center' : '', 'is-' + effect] is-center是样式类名，是否居中,如果center为true，就输出is-center这个类名，
- props的高级用法
type:{ //这个type是props的name，由外面传来
    type:String,参数的类型
    defaule:"info" //表示使用默认的
    validate:function(){} return boolean//通过返回一个Boolean值的回调函数,来决定是否要报错
}
type:{ //App的el-alert传过来的参数
    type:String, //属性type的类型，所以如果App.vue里面type写的是数字（通过:type="111"形式测试，加冒号用js运行的区域测试，不然会被自动转换成string类型），会报错
    default: 'info' //默认值，不用传了，使用默认值,即前面App.vue里面type定义的
},
原来的使用方法
props里面可以是一个中括号：props: ['type','title']，外面传入这两个参数，这是通用的组件式开发

传递number Boolean object array类型的时候注意，做动态绑定，否则传递过去的参数类型会不正确，比如number会变成String
组件在接收到参数的时候可以进行一定的修改

实现
1. showIcon 传false 不显示     2. close 实现及emit  3. isBigIcon
??
<i class="el-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
如果在App.vue中closeText="关闭"：
<i class="el-alert__closebtn is-customed" style="display: none;">关闭</i>
App.vue中：其实可要可不要这两个？
:closable="true" closeText="关闭" 原来的x变成关闭两个字
is-customed??
- his.$slot.default
用来访问被 slot 分发的内容。每个具名 slot 有其相应的属性
（例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到）
default 属性包括了所有没有被包含在具名 slot 中的节点

isBigIcon(){
            return this.description || this.$slot.default ? 'is-big' : '';
        }
description在App.vue写了东西就会变成大图标，不屑就没东西？

# 怎么使用element-ui的？
import ElementUI from 'ekement-ui'
Vue.use(ElementUI)
然后你就能全局使用element-ui了
- 为什么？vue.use 背后在干什么？
- 如果只想使用部分组件怎么做？
在网页开发中，js是越少越好-》性能优化中
如果项目中用不到所有组件，只使用部分，打包的时候js就越少，项目就越快

- 每一个组件都是一个目录
carousel组件，设计成了一个父子组件，各司其职。将组件拆分，拆的足够细：
carousel-item
如何划分职责
容器组件 决定横向|竖向滚动，是否自动 自定义事件，外界由此知道滚动到哪里@change interval多少秒
子组件 关系是slot关系
- element-ui 组件开发，框架，难度 表震度 专业度 多个部门协作的
index.js方便安装 install Vue.component

2. 编写ElButton
- 保留了css,fucus组件设计
- components/ElButton
- 根据不同类型，生成不同的类名，利用vue中的computed属性
- 朴素按钮，圆角按钮，都是通过类名来分别制定
  is-plain is-round类名 :class
  icon属性
  打理slot,默认的按钮有slot的，利用v-if


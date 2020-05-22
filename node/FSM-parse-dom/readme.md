# 有限状态机
文本处理的时候有一个很强大的东西，叫正则
正则表达式的实现就是靠状态机实现的

KMP:是 indexOf字符串匹配的时候的一个高效的算法，里面需要构建一个数组，这里面也是使用了状态机

## 状态机的基础知识
查找一个字符串中有没有一个"a"这个字符
'i am good'找这里面存不存在a,不用indexOf怎么做？


DOM树上的节点是有类型的 https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
有html标签包起来的类型是1，是一个元素节点例如<p> <div>
比如<h2>中的文字，也是一个节点，这个字也是有类型的，是文本节点
词法分析 2.js
html还行，有配对的东西，但是js 编程语言 这个没什么明显的配对的东西，LL LR算法 用栈处理
栈怎么匹配？
遇到开始标签一律入栈，遇到结束标签，栈顶元素和自己的标签名是一样的标签说明是配对的，配对的就pop掉
匹配到最后，没有匹配上说明是有问题的，
## 语法分析，


# 继续 浏览器渲染解析
上次已经生成了一个DOM树，现在还要把css解析出来，把css追加到DOM树上，layout树
复习一下上次的树，2.js
新建css-computer.js
要在header中写css

// 还需要一个状态，img这种 自闭合的
// 选择器 浏览器解析选择器，我们这里只写标签，类，属性选择器
// 要让myid这个元素，这个节点上该有的css附加到DOM中去
// 要拿到css内容 分析选择器 与id对应起来
// 要先拿到里面的内容
```js
let htmlStr = `<html>
<head>
    <style>
    body div myid {
        width: 100px;
        backage-color: #fff;
    }
    </style>
</head>
<body>
    <div>
        <div id="myid">
            <span></span>
            <img />            
        </div>
    </div>
</body>
</html>
`;
```
单纯文本也是节点，是一个文本节点


start状态继续修改

1. 属性的解析
attribute

解析标签名的时候中间加了一个空格
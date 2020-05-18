babel的插件都会包含plugin这个名字
babel-plugin-import是用来做按需加载的，是ant-design的开发团队写的
tree shaking一定要在es module上才有用
https://www.npmjs.com/package/babel-plugin-import
把import换成require('')中的一个路经

我们模仿这个
babel的一个规定的语法，名字前面有babel-plugin 引入的时候直接写后面的

要不要转为驼峰命名的路经

## babel
是一个用来编译的，编译流程：
babylon 解析接受的代码，解析为一棵AST(抽象语法树)
还有一个包 babel-tracerse 对AST进行遍历，有转换规则。我们的插件就是在这里生效，对前面的树进行增删改查然后生成一棵新的书，然后再通过generator还原成code

babel就是一个编译器，
babel编译有三步：
1. 解析 parse 代码变成抽象语法树
2. 转换 transform
3. 生成 generator
解析：
代码变成AST,code->AST 怎么变？
 怎么把代码变成抽象语法树？
 - 词法分析：怎么做？
    状态机 http解析，把源码解析成一个个的token
 - 语法分析: 更复杂 要涉及算法LHS RHS
 三本书：编译原理 龙书虎书鲸书
 html解析成dom书不用那个算法也可以，html有标签
 ```js
 <div>
    <p></p>
 </div>
 ```
 词法分析就是把他们解析成一个个单独的合法的token：div p
 token:
 start-div start-p end-p end div
 其中尖括号和空格都是没有意义的 
 词法分析的都是独立的一个个合法的字符。
 ```js
 {
     tag: 'div',
     children: [
         {
             tag: 'p'
         }
     ]
 }
 ```
 有父子关系的树，
 语法分析，把其中的父子关系构造出来，
 如果是编程语言（比如一个function）要把函数名找出来，还有函数体中的变量有哪些找出来，构造出上下文关系
 - AST（是语法分析后的结果）构造出来了 astexploter.net可以看到
 ```js
 var str = '123'
 ```
 用babel-line解析这段代码，变成一颗树
 变量声明在VariableDeclaration这个对象中
 NumericLiteral这些词都是ECMAScript中约定的
平常我们定义一个数字：
```js
var a = '123';
```
但是标准中将这个叫数字字面量NumericLiteral
代码生成的抽象语法树是固定的，代码执行的时候编译的时候会检查是否有语法错误，检查的就是语法树

transform:babel插件就在这里

我们针对import { Button } from 'antd';这样的语法进行转化
import转化成AST后叫importdeclaration
babel提供了写插件的方法：
新建文件index.js

js中的树只能用对象来表示，
取树哪部分，有ECMAscript规定的字段 语句的类型

词法分析
我今天很高兴：
词法分析： '我' '今天' '很' '高兴'  有意义的词分一起
语法分析：分析完后能知道那句话是什么意思，强调的是一个整个语境，上下文，构造出很整体的信息
语法分析后就是一棵AST树 树上的每个节点都是一种结构
有虚拟DOM和真实DOM的意思
用一个对象表达你的源码，其实就是一个抽象语法树
比如源码：
```js
while(true){
    try {
        var a = 1;
    } catch(err) {

    }
}
```
<!-- 简单的AST -->
```js
bady: [
    while: {
        condition:true,
        statement:null
    }
    try: {
        var: {
            variable: 'a',
            value: 1
        }
    }
    catch: {
        argument: err
    }
]
```
AST只要把源码的组织方式表达清楚就行
词法分析器创建出分析树

所有的编译器不是用正则来直接替换的，而是由源码生成一棵AST树
正则分析源码的能力太弱，而且性能不高
树的信息多

运行npm run compile

@babel/types包导入这个包，用ImportDeclaration 传两个参数进去
specifiers 是一个数组

要生成什么节点，首先要知道要生成的是一个什么节点，然后找生成结点的方法，不同的节点有不同的方法，
生成的节点需要什么信息 specifier就是要生成的变量名
还有些东西是可以复用的，
然后进行替换

平常写的import xxx from ''
var num = 123;
在ECMAScript中是怎么规定的
它是针对整个js的
虚拟DOM (vue和react的核心，提升页面性能）+ 算法tree + 重绘 重排
浏览器工作原理

虚拟DOM
算法 关于树： 二叉树，二叉搜索树 平衡树 红黑树
当输入URL到拿到页面，中间发生了什么，越详细越好（页面重绘的联系性，因为DOM树）

如果下载css文件阻塞了，回堵塞DOM树的合成吗？
首先什么是DOM树
阻塞渲染 不阻塞解析
不会阻塞DOM树的合成，会阻塞页面的显示
是不同的阶段

webpack 从url-》发出一个http请求，download html文档 =》解析出来页面 （ 我们可以看到的）由显卡绘制出来的页面
分阶段
用webpack做类比 根据配置文件，融入口开始，将不同的文件进行相应的打包压缩
webpack工作流，不同的阶段=》打包输出dist.js
网页的编译也一样
1. DOM树的合成
html标签下载来 生成一棵dom树 
2. 页面的显示，重绘，重排，跟css处理有关，是需要一定时间的
浏览器把页面展示出来，也叫绘制出来，他也是一个有工作流程的
- 入口是什么？
- 不同类型的文件不同的loader,对应的浏览器的工作流程他又对应着什么
- 输出是什么？

css下载的时候，因为网络原因，为什么不会阻塞dom树的形成？但是会阻塞页面的渲染
1. 入口：html文件
页面绘制的入口，就是下载下来的这个html文件

不会阻塞DOM树合成，那就说明，合成是比页面的显示早，页面显示是在css文件来了之后才渲染，因为要计算css的一些东西

index.html 网络子进程，以buffer
二进制流来了之后，页面渲染

react中有一个resolve:[]
我们这里有这几种文件要处理
resolve:['.html','.js','.css']
根据不同的文件进行不同的处理
html:超文本标记语言 负责结构
<p>这里面的就叫做文本</p> 这个就是标记
原生dom会有标签节点（document.createElement)，还有文档节点(document.createTextNode)
css:叫层叠样式表 负责样式
stylesheet p{color:red}
js:javascript 他负责的是动态的DOM部分 动态事件处理

- 网页解析从document文档开始，此时没有DOM树，网页时空白的，也没有渲染树，布局，样式也没有，js的event loop更没有，只有document文档，只不过还是空白的
文档中只有标签就可以

webpack中有rules,而在浏览器渲染中，渲染通过最初的html文档内容进行分去处理
为什么有标签就可以？用来区分不同的文档，不同的文档进行不通过的处理

渲染的阶段？
- 不同类型的文件，不同的loader
每个阶段？
类比：每种不同的文件，在webpack中是什么样的？
webpack:
开始每个子阶段，有其输入的内容 .styl .css .png .ts
对其进行响应处理 loader
每个阶段生成的输出内容 打包到bounder.js

上一阶段的输出，会成为下一阶段的输出

- 输出是什么

第一阶段
1. 构建DOM树 在内存中构建，速度很快，此时看不见页面 DOM合成不会被阻塞
为什么要构建文档树？
因为浏览器没办法理解 HTML 格式

要把页面显示出来，其实是编程的过程，
不过是数据结构（tree) + 算法（css 的selector, js 的querySelector 查找效率）
选择什么树来解决？

先创建一个数据结构，这个数据结构在内存之中 二叉搜索树 构建一个搜索树BST
（我们的文件可能不是二叉的，因为节点），效率高，
2. 添加css属性 到每个节点 样式可以写在stylesheet里面，或者行内样式中
样式的计算 recalculate style
document.styleSheets
这么多样式怎么管理起来？是一个样式表
有规则
选择器，权重，层叠的概念，哪个的优先级高，放哪个
当浏览引擎接受到css文本时， text/css 把文件交给样式计算，进行渲染
然后一个个放到document.stylesheets对象中（形成对象） 用json的方式组织css规则
选择器就是key,value就是属性值
document
样式的计算
- 转换样式表中的属性值，使其标准化
 因为最后绘制的时候是要算像素的
  文本组织成json对象
  有几个子步骤
  对渲染树的body{font-size:2em}  em css3 要转换为px
  font-weight:bold 700  用多粗的笔画出来
  为了显卡拿到东西能画出来
- 计算每个结点的具体样式，为下一步做准备（上一步的输出，是下一步的输入） 把属性挂在节点上
    1. 继承规则 继承父元素样式
    2. 层叠的规则
    3. 浏览器默认样式及节点样式 
     选择器的优先级 浏览器的默认样式 所以有时有要reset一下
3. 布局阶段
计算每个dom节点的大小 -》 这是绘制的过程 布局 js文件
需要计算出DOM树中可见元素的几何位置，这个过程叫布局

这时候就会生成第二颗树，为什么需要第二颗树?
这棵树叫渲染树，负责的核心任务是进行页面的绘制
构建一个DOM渲染树，这里面包含可见元素
因为dom中有些元素是隐藏的，渲染树，实时与家电挂钩，可以减少有些页面的渲染

隐藏元素span去掉

构建布局的过程
1. 遍历DOM树的所有节点，并把这些节点加到布局树中去
2. 进行布局的计算
    
然后开始绘制

什么叫双飞翼布局？ 阿里的发明
圣杯布局
原文链接：https://blog.csdn.net/qq_38128179/article/details/86542447

圣杯布局和双飞翼布局达到的效果基本相同，都是侧边两栏宽度固定，中间栏宽度自适应。 主要的不同之处就是在解决中间部分被挡住的问题时，采取的解决办法不一样，圣杯布局是在父元素上设置了padding-left和padding-right，在给左右两边的内容设置position为relative，通过左移和右移来使得左右两边的内容得以很好的展现，而双飞翼则是在center这个div中再加了一个div来放置内容，在给这个新的div设置margin-left和margin-right

发生在第三部分 布局树中
定位，margin 几何位置
圣杯布局有缺点，中间比左右两边窄的时候，会掉下去
都是三列式布局，圣杯有缺点，主题宽度小于left的时候，会掉下去？？
只有三个节点 DOM树简单，布局树少点
双飞翼，解决了这个bug，但是也有缺点？
html结构上 添加了一个父容器
性能不如圣杯 dom树更复杂，渲染性能不如圣杯
计算属性要多计算一个节点

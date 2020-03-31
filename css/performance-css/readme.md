从实践证明transform有多优秀

w3c组织

规定 浏览器最好实现渲染是

60fps


60


60个静态图片

一帧花费多少时间


一秒是1000毫秒 一帧就是花费1000/60 毫秒 16.6666.。

60fps人眼看着舒服


如果一帧渲染大于1000/60毫秒 会让用户感觉有明显的卡顿


浏览器除了加载动画，还有其他功能要加载，如果在动画上花太多时间，用户在使用其他功能的时候就会明显的觉得卡顿

浏览器没有足够的时间处理用户的输入

css的性能优化

用户明显的卡顿 ，假设 浏览器花费了过多的时间处理 动画，导致其他的任务（用户的输入）得到的时间较少，浏览器没有足够的时间处理用户输入

会有时间不够这件事 是因为浏览器已经规定了一帧的固定频率，如果加大，就会挤占其他的时间

浏览器的一帧要处理：js->style->layout（布局）->point（绘制）-?composite(合成）


主要讲后三个


都是与浏览器渲染相关的

先从DOM树开始

平常写的html、java......任何语言对于浏览器来说就是字符串，写完后，浏览器会将其解析为DOM树，会有父子关系的。有了DOM树，下一步就是将DOM树上的结点对应的样式附加到树上，就得到渲染树，然后就是布局，就是具体放在浏览器的哪个位置。因为上一步已经有了样式，到布局的时候就是看这些节点在浏览器的哪些位置，得到位置信息。

有了位置信息就然后是绘制，绘制是浏览器结合cpu

合成composite，跟ps中的那个图层类似，在ps看来，一个图片不是个平面，而是立体的。

右键检查可以在浏览器查看 MoreTools->Layers,就能去layers的开发者工具中看


网页是一层一层构成的，合成了之后，用户就能看到一个平面了


layout->point->composite看着是一个流程，但其实这三个并不是必经的


也可能会从style直接跳到point


不经过layout



那这样直接跳过算不算优化呢？

让浏览器尽可能跳过后三步，不让他们全部都走一遍

relayout 重排， repoint 重绘


改变背景，文本阴影 box-shadow,color这些之后触发重绘，也就是跳过  元素的位置变化了才会需要重排 比如改了宽高，换一个布局display[none  /  bock]...会让浏览器去重排


https://csstriggers.com/


css造成的影响


所以改css的时候 尽量能不影响的就不影响，尽量跳过


point能不能跳过呢? 可以


那些会跳过layout和point 直接到composite？


比如transform

改变css属性的时候尽量不引起重排（layout） 只引起point


具体有哪些可以 可以查看那些css


1：改变 css 属性，尽量不引起layout
2：transform cursor 他们非常优秀 直接到达 composite

3：css 动画的时候尽量考虑 transform

移动元素的x y 轴 transform 还有一个是 left top bottom，一个明显的优势就是transform在渲染的时候 直接跳到composite

看transform


transform 用的时候要处于自身的合成层   用layers可以看出来 我们的这个两个盒子也是有分层的

用transform的时候 元素在自己的合成层的时候 才能直接跳到composite
如果元素在一个独立的图层上面，transform cursor 他们非常优秀 直接到达 最后一步composite
怎么变呢？
将页面变成一个独立的图层：
1. 加个translate3d将box2提升为独立的一层
2. will-change 
加完了之后就发现 box1移动的时候 页面就不绿了(Rendering->Paint Flashing) 不再重新渲染 不会重排 重绘 直接合成
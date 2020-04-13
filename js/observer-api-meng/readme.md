选中 监听事件，srcoll 不停的计算有没有出现在视窗内
```js
    window.addEventListener('scroll', ()=>{
        //传统的 被动的 监听滚动事件，不停地计算有没有出现在视窗内 获取距离 触发的频率太多
        //及其浪费时间
    })
    //2. 主动的 出现了=》主动告诉我 我不去计算 观察者
```
- 交叉观察者 判断某个元素有没有出现在可视范围内 IntersectionObserver
图片和页面有重合的地方，就是说有交叉的地方
图片懒加载
被用户看到：元素出现的比例到什么程度才叫做被用户看到？411爆款返场图 
假设定义一个指标：真个元素出现100%，才定义为被用户看到了

看看知乎https://www.zhihu.com/question/67328049/answer/488549036
- MutationObserver
变动观察者 还是符合观察者的特色 变动了就主动通知
观察DOM节点变动了没有
vue源码中有用到
应用在：
一个小游戏http://kolor.moro.es/ 去到下一关 背景色就变了 具体变得是div标签的bgc在变也就对应的是dom节点在变（style属性变了）
在控制台测试的时候 先执行一下 让他观察一下，再开始start

这两个观察者都有一个不再接受观察者推送的消息的方法
html node has type,like textnode文本节点
nextTick方法 怎么实现nextTick的呢？就是
劫持数据变化-》发现数据变化了-》render 页面
有个场景 data中有个数据name 
name在模板中已经渲染了：
{{name}}
data() {
    return {
        name: 'hhh'
    }
}
假设：
for(let i = 0~1000 0000) {
    //在这个for中一直改变name 数据变化了一次就会页面就会渲染一次，次数多了 就很不好
    //那么我们的vue就会帮我们把变化的数据缓存起来，也就是这1000 0000次变化事实上渲染的时候就只关心最后一次数据，之渲染最后一次，vue的nextTick就是能帮我们达到这个要求的
}
比如schedule中使用过：
在next-tick时机执行页面更新flushScheduleQueue,放到nextTick的回调中
nextTick(flushScheduleQueue)
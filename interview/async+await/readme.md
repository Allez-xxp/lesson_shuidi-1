async+ await的发展历史
最经典的是回调
1. 了解generator
//1.generator内部相比普通函数而言，是可以被终止的
//2.相比普通函数，generator调用的时候是一步步的，用next来调用
//3.可以理解为，有几个yield就要执行几个next,每次执行用yield作为停顿
用done是否为true来判断是否还要next
while(!g.next().done) {
    g.next();
}
next传参问题要注意，

babel转换代码：
try it out去官网看

async和await是怎么转成generator的？
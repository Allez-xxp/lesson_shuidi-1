# 2020春招名企前端准备课
https://juejin.im/post/5ddfa3def265da05ef59fe6e
头条，字节跳动的面试题
记一次手撕算法面试
## 大厂面试以算法为核心 Leetcode 剑指offer

- 开始 有效括号 简单算法题，会需要优化！体现算法能力。
给定一个只包括 '('，')'的字符串，判断字符串是否有效。注：空字符串属于有效字符串
leetcode 20:
https://leetcode-cn.com/problems/valid-parentheses/
用栈

关于@param {string} s
https://www.html.cn/doc/jsdoc/tags-param.html
 有效括号使用栈的数据结构，左边括号入栈，右边括号出栈，最后判断栈是否为空
 当右边括号，没有栈的左边括号元素可以去消的时候，可以提前判断不是有效的括号
 (()))
- 优化一下
时间复杂度，空间复杂度
 O(n)
 空间复杂度：O(n)
 定义变量，定义栈(开销大)->O(n),如何变成O(1)呢？
 由于我们栈里面存放的都是**同一种字符 **"(" ，其实我们可以用一个变量来取代栈的，这个变量就记录 "(" 的个数，遇到 "(" 变量就加 1，遇到 ")" 变量就减 1，栈为空就相当于变量的值为 0。
- 总结（1）
面试官的想法是什么？
考算法，通过算法了解同学的基础算法能力，以及思维很重要
通过valid-parentheses,算法的通识题，通过优化考对时间复杂度，空间复杂度的理解。这里提出的优化是空间复杂度为O(1)
使用了变量做一个计数实现优化！

- 最长有效括号（最长匹配长度）
leetcode 32 hard
https://leetcode-cn.com/problems/longest-valid-parentheses/
给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
用动态规划思想来解决
1. 暴力法
使用嵌套循环：使用冒泡排序算法（把数排好序）。可以求出每一个位置的符号(外层循环)，它的最大有效括号长度(内层循环)是多少？tmpMax
求一个max
- 总结（2）
时间复杂度为O(n^2)
2. 将时间复杂度降降
tmpMax来计算，左右括号，下标之间做减速，得出长度
())(())
一次遍历 i 下标法
-1 哨兵元素 0-（-1）<-第一个符号进去了(下标是0)
当前栈为空时，暴力法应该是要退出了，这里却max=2 省循环的根本
2就是前面匹配的长度 然后重新再来

- 总结（3）
面试官从有效括号到最大匹配长度
空间复杂度，时间复杂度
<!-- leetcode -->
# 206 反转列表
https://leetcode-cn.com/problems/reverse-linked-list/

两种解法，三种语言
## 通过前驱结点及后继结点的概念，使用遍历
当前结点的next应该指向它的前驱结点
之前的前驱结点变成当前结点
当前结点变成原结点的后继节点
如果为null 完成遍历
## 用递归
- 把复杂的类似的变成简单的重复
- 有一个退出条件
简单公式 n 个结点反转 只用到1个结点
当前结点cur next指针指向的结点的next 指向当前结点的话就反转->只与一个结点相关
结点的next属性干掉

退出条件：
当前结点cur next指针指向的结点的next为null时

leetcode 面试题62 圆圈中最后剩下的数字
链接：https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof

0,1,,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

题解：
https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-by-lee/

// 给定一个长度为 n 的序列，每次向后数 m 个元素并删除,最终留下的是第几个元素？将这个问题拆分成子问题     
// 首先，长度为n的序列，最先删除的是第m % n的元素，剩下一个长度为n -1的序列，递归的求解fn(n-1,m)
// 就可以知道对于剩下的 n - 1 个元素，最终会留下第几个元素，我们设答案为 x = f(n - 1, m)。
// 长度为 n 的序列最后一个删除的元素，应当是从 m % n 开始数的第 x 个元素。因此有 f(n - 1, m) = (m % n + x) % n = (m + x) % n。
//递归计算 f(n, m), f(n - 1, m), f(n - 2, m), ... 直到递归的终点 f(1, m)。当序列长度为 1 时，一定会留下唯一的那个元素，它的编号为 0。

题解：
链接：https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/li-jie-gui-lu-hen-jian-dan-javascriptjie-fa-by-fu-/

n个人编号0,1,2,...,n-1，没数m次删掉一个人
假设有函数f(n)表示n个人最终剩下人的编号
n个人删掉1个人后可以看做n-1的状态，不过有自己的编号。
n个人删掉的第一个人的编号是(m-1)%n，那么n个人时删掉第一个人的后面那个人(m-1+1)%n一定是n-1个人时候编号为0的那个人，即n个人时的编号m%n（这个编号是对于n个人来考虑的），n-1个人时编号为i的人就是n个人时(m+i)%n
所以f(n)=(m+f(n-1))%n
f(1)=0，因为1个人时只有一个编号0。
因此可以将人数从2反推到n：

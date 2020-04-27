33. 搜索螺旋排序数组
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
示例 2:

输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1

二分法
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/33-sou-suo-xuan-zhuan-pai-xu-shu-zu-by-alexer-660/

>>是右移运算符。 <<是左移运算符
x >>= 1 等同于 x = x/2;
这是位运算， >>左移运算，<< 右移运算
x >> n 等同于 x / (2^n)
x << n 等同于 x * (2^n)
当然了，要注意类型所占内存的大小，以防溢出
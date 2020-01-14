[分隔链表]https://leetcode-cn.com/problems/partition-list/
给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
你应当保留两个分区中每个节点的初始相对位置。
示例:
链表linklist 特定值x=3时，有head=1->4->3->2->5->2
隔成两个区 每个节点的初始相对位置要保留
1 2 2   4 3 5
1. 形成两个区域，每个区域都是链表
定义两个链表 smaller bigger
2. 一次链表遍历
将比x小的放在smaller区反之放在bigger
3. 将这两个区连起来 smaller.next=bigger

总结：通过两个链表 分隔链表的不同的区域的子链表，两个子链表再组合起来
var smaller=dummySmaller=new ListNode(-1);//实例化了一个结点，定义了两个变量 -1？我们的实例是正数
var greater=dummyGreater=new ListNode(-1);
重要技巧^
js实现

python实现：

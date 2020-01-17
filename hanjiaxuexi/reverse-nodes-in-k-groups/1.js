function ListNode(val){
    this.val=val;
    this.next=null
}
var n1=new ListNode(1);
var n2=new ListNode(2);
var n3=new ListNode(3);
var n4=new ListNode(4);
var n5=new ListNode(5);
n1.next=n2;
n2.next=n3;
n3.next=n4;
n4.next=n5;
console.log(n1);
var reverseKGroup=function(head,k){
if(!head||k==1) return head;
var dummy={//哨兵结点
    next:head
}

//reverse处理整个链表的其中一个单元
var start=dummy;//*初始化时为dummy,会动态的改变的 之后会变成每个小组的开始节点（前驱结点，不是这个小组的内部节点）*
var end= head;//?与k相关  *每个小组更新前会指向的这个小组的第一个节点，其实若能形成一个小组，这也会是这个小组的尾节点？
var count=0;//计数器
while(end!=null){//通过.next实现一次遍历
    count++;
    if(count%k==0){//能整除，可翻转  得到小组
        // if(count<3){
        //     // [1,2]
        //     console.log(start.val,end.next.val);
        // }

        // 更新start 一次反转后 start应该是这次反转的尾节点
        start=reverse(start,end.next);//将这个小组反转一下，第一次的start是dummy 反转之后的要与别的小组能连接上
        end=start.next;//要反转的小组的第一个节点
    }else{
        end=end.next;
    }
    // end=end.next //更新end的值

}

return dummy.next;
}
// start与end之间是要reverse的
// 处理一次翻转
var reverse=function(start,end){
    var cur=start.next;//头结点
    var prev=start;//前驱结点
    var first=cur;//保存第一个节点，反转以后会成为尾节点，也是下一组的头指针（dummy）
    while(cur !=end){//例如第一次end是等于3的，不是小组中的结点
        var temp=cur.next;
        cur.next=prev;
        prev=cur;//当前结点变成下次的前驱结点
        cur=temp;//当前结点为下一个结点
    }
    //prev变成了小分组里的头节点
    start.next=prev;
    first.next=cur;//原来的头结点变成尾节点
    //链小组，就要把上次的尾节点指向下次小组的开始节点
    return first;
}
console.log(reverseKGroup(n1,3));
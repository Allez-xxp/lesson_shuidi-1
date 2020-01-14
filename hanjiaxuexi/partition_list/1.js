function ListNode(val){
    // 节点类
    this.val=val;
    this.next=null;
}

var partition=function(head,x){
    var smaller=dummySmaller=new ListNode(-1);//实例化了一个结点，定义了两个变量 -1？我们的实例是正数
    var greater=dummyGreater=new ListNode(-1);
    while(head){
        console.log(head.val);
        //链表的遍历
        //head是动态的，从头走到尾
        if(head.val<x){
            smaller.next=head//进入较小值分区
            smaller=smaller.next//更新smaller,
        }else{
            greater.next=head
            greater=greater.next
        }
        // console.log()
        // 合并两个分区
        
        head=head.next;
    }
    //greater已经是最大值了 dummyGreater.next此时其实是greader的第一个有用的节点
    smaller.next=dummyGreater.next;
    greater.next=null;//链表最后一个节点的next都是为null的
    return dummySmaller.next;//返回了分隔后的头结点
}

const n1=new ListNode(1); //实例化链表节点
const n2=new ListNode(4);
const n3=new ListNode(3);
const n4=new ListNode(2);
const n5=new ListNode(5);
const n6=new ListNode(2);
n1.next=n2;
n2.next=n3;
n3.next=n4;
n4.next=n5;
n5.next=n6;
console.log(n1);
console.log(partition(n1,3));

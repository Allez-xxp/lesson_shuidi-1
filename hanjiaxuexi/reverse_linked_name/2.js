function LiseNode(val){
    this.val=val;
    this.next=null;
}
const reverseList=(head)=>{
    if(head==null ||head.next==null){//结束退出条件
    return head;//新链表的头结点
}else{
    let newHead=reverseList(head.next)//递归
    head.next.next=head;//反过来
    head.next=null;//把之前的next干掉
    return newHead;
}
}

const n1=new LiseNode(1);
const n2=new LiseNode(2);
const n3=new LiseNode(3);
const n4=new LiseNode(4);
const n5=new LiseNode(5);
n1.next=n2;
n2.next=n3;
n3.next=n4;
n4.next=n5;
// console.log(n1);
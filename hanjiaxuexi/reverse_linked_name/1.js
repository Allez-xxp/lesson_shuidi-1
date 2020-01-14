function LiseNode(val){
    this.val=val;
    this.next=null;
}

// 下一个结点，即后继结点
// 当前结点 出了头结点外会有前驱结点
var reverseList = function(head){
    if(!head || !head.next) return head;//空链表或只有一个结点直接返回
    let cur=head;//当前结点
    let pre=null;//前驱结点
    while(cur){//遍历法
        const next=cur.next;//当前结点的后继结点
        cur.next=per;//反过来了 将当前结点的指针指向原链表的前一个结点
        // 如果cur是头结点即指向null，原来的尾节点，所以要先let pre=null;
        pre=cur;//前驱结点变成当前结点
        cur=next;//后继节点变成当前结点
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
console.log(n1);
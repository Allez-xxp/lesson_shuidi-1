function ListNode(val){
    this.val=val;
    this.next=null;
}
const n1=new ListNode(1);
const n2=new ListNode(2);
const n3=new ListNode(6);
const n4=new ListNode(3);
const n5=new ListNode(4);
const n6=new ListNode(5);
const n7=new ListNode(6);
n1.next=n2;
n2.next=n3;
n3.next=n4;
n4.next=n5;
n5.next=n6;
n6.next=n7;
console.log(n1);

function removeElements(head,val){//参数：头结点 ，val 要去检查的值
    // 如果当前结点的下一个结点的值为val，那就把当前结点的next指向当前结点的next的next
    // 如果头结点的值是val?所以要先做特例
    const dummy={//哨兵 假结点 让他的next等于head 但不赋值，即在head头结点前面做了一个假结点
        // val属性为空，假的，服务一下
        next:head  //哨兵结点为了头结点，可能是为值为val的结点服务 保持链表
    }
    let current=dummy;//当前结点先指向哨兵结点
    while(current && current.next){//遍历 current.next：尾结点的下一个结点不用再判断了，
        let next=current.next //取当前结点的下一个结点
        if(next.val===val){
            current.next=next.next;//值为val要被删除的 下一个结点从链表的链式关系中移除，新的链又链接了关系

        }
        if(next.val!=val){
            // 不移除的
            current=next;
        }
    }
    return dummy.next;//哨兵是借来用的，假的，移除dummy 返回dummy.next，为解决头结点是要删除的结点时的麻烦
}

console.log(removeElements(n1,6));

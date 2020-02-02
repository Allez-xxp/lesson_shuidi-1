function longestValidParenteses(s){
    //最长有效匹配括号长度 leetcode 32题
    //有效括号的升级+长度
    var max=0;
    if(s.length==0 || s.length==1) return max;//没有最长匹配
    var stack=[];//使用栈来实现匹配 空间复杂度O(n)
    //使用嵌套循环
    // 每位的括号他的匹配是可以跟简单版的有效匹配是一样的
    for(var i=0;i<s.length;i++)
    {
        var tmpMax=0;//当前位括号的匹配长度，设置为0，每次迭代都能重新从零开始
        for(var j=i;j<s.length;j++){//j从i开始不是i+1?因为如果是有效匹配，自己也算1的 +1(字符串数目加一)
            if(s[j]=='('){
                stack.push('(');
                tmpMax++;
            }else if(s[j]==')'){
                if(stack.length<1){
                    //当前栈是空的，而现在又来了一个‘）’,结束了，算总值
                    max = max<tmpMax?tmpMax:max;
                    break;
                }else{
                stack.pop();//有效匹配到，出栈
                tmpMax++;
                }
            }
        }
        if(stack.length==0){
            //匹配到最后，都是匹配的
            max = max<tmpMax?tmpMax:max
        }
        stack=[];//清空为本次括号的服务
    }
    return max;
}
console.log(longestValidParenteses('()()())'));
// ??console.log(longestValidParenteses('()()()('));输出0是因为什么？
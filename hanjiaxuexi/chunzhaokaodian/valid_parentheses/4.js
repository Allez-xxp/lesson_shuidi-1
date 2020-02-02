function longestValidParentheses(s){
    //时间复杂度O(n)
    var max=0;//最大初始化长度为0
    if(s.length==0 || s.length ==1) return max;
    var stack=[-1];//栈来服务于有效括号匹配 哨兵-1帮助下标为0时的
    //左右括号匹配的下标的减法就是长度值
    for(var i=0;i<s.length;i++){ //只要一次遍历，时间复杂度O(n)
        if(s[i] == '('){//左括号，下标入栈
            stack.push(i);//i就是下标
        }else{
            stack.pop();//右括号，下标出栈
            if(stack.length < 1){
                stack.push(i);//栈顶元素都没有了，那么前面的有效匹配结束了，后面的开始，那就要减去当前的下标（也就是之前-1的概念），所以push当前的下标
            }else{
                max=Math.max(max,i-stack[stack.length-1])//有效的括号匹配 stack.length-1栈顶元素
            }
        }
    }
    return max;
}
console.log(longestValidParentheses('()()())'));
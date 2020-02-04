function longestValidParentheses(s){
    if(!s ||s.length<1) return 0;//如果为空
    var left =right =max=0;//用两个变量代替模拟栈的意义
    // left是当前还在匹配的左边括号的数量，right是当前右边括号的数量
    for(var i=0;i<s.length;i++){ //时间复杂度O(n)
        if(s[i] == '('){
            left++; //入栈，有多少个入栈
        }else{
            right++;//右边的入栈
        }
        if(left==right){
            max=Math.max(max,2*right);//有效匹配的长度
        }else if(left < right){ //后面就无效了
            left = right = 0;//重新开始，后面还有
        }
    }
    left=right=0;
    for(var i=s.length-1;i>=0;i--){//倒着走一边也一样，不需要栈来概念化的表达匹配
        if(s[i]=='('){
            left++;
        }else{
            right++;
        }
        if(left==right){
            max=Math.max(max,2*left);//有效匹配的长度
        }else if(left > right){ //后面就无效了
            left = right = 0;//重新开始，后面还有
        }
    }
    return max;
}
console.log(longestValidParentheses('()())()'));//有问题！
// console.log(longestValidParentheses(')()())'));
// console.log(longestValidParentheses('((())(())')); 前一个的修改，从右到左
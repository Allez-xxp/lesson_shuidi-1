/**
 * 
 * @param {string} s
 * @return {boolean} 
 */
var isValid=function(s){
    if (!s || s.length <1) return true;//字符串为空
    var n=s.length;//字符串长度
    var stack=[];//新建一个数组，stack是栈的意思（JavaScript中无队列，栈的概念，我们用数组模拟栈）
    // 数组里有push pop方法，插入或弹出数组中的最后一个元素，只在数组的尾部（或者说顶部）插入或删除元素->栈，先进后出
    // 在数组的尾部位置插入push，数组的头部移除 shift()->队列 先进先出
    for(var i=0;i<n;i++){ //时间复杂度O（n）(一个循环就是n)
        var c=s[i];
        // console.log(c);先遍历一下数组测试一下
        if(c=='('){ //要等)跟它相消
            stack.push(c);//入栈，数组的最后一个元素也就是栈顶元素
        }else{
            //将栈里的元素消一个
            if(stack.length<1){//进来之后成为了第一个符号就是")",或者是消到后面是两个)
                return false  //说明是无效的了已经
            }
            stack.pop();
        }
    }
    return stack.length > 0? false : true; //为false说明栈里还有东西没抵消掉
}
console.log(isValid('()'));//true
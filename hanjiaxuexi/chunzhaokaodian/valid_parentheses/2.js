//空间复杂度O(1) 不用栈
function isValid(s){
    if(!s ||s.length<1){
        return true;
    }
    var n=s.length;
    var sum=0;//O(1)空间复杂度，用一个变量取代stack
    for(var i=0;i<n;i++){
        var c=s[i];
        if(c=='('){
            sum++; //代表原来的入栈
        }else{
            //代表右括号
            if(sum==0){//前面消完了已经没得消了
                return false;
            }else{
                sum--;
            }
        }
    }
    return sum==0? true :false;
}
console.log(isValid('())'));
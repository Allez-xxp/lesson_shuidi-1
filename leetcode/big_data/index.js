var num1='12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
 num2='901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890';
// console.log(num1+num2);
// 大数相加 数字超过语言范围
//按从个位开始加。因为在内存中表达，数值型number已经不能表达了，会infinity（无限）那么该如何表达呢？
// 每次去加两个数的最后一位
function addTwoNumber(str1,str2){
    // 先变成字符串
    // 1.字符串从尾部到首部
    // 2.两个数的位数是不一样的
    var carry=0,//进位 是个变量，帮忙计算每个回合的进位
    l1=str1.length,
    l2=str2.length,
    arr=[];//放结果
    var max=Math.max(l1,l2);//何时休，看哪个更长
    //  n=max-1 n是最多要进行多少次计算 n>=0 比较，
    for(var i=l1-1,j=l2-1,n=max-1;n>=0;n--,i--,j--){
        // var sum=str1[i]+str2[j]+carry;//每一次的相加和,但现在的是字符与字符相连
        // var sum=parseInt(str1[i])+parseInt(str2[j])+carry;或者
        var sum=(+str1[i] || 0)+(+str2[j] || 0)+carry;
        // console.log(sum);
        // break;
        if(sum>=10){
            carry=1;
            arr.push(sum-10);
        }else{
            carry=0;
            arr.push(sum);
        }
    }
//最后一次的时候还有进位
    if(carry>0) arr.push(carry);
    return arr.reverse().join('');//颠倒一下里面的数，再把字符串返回

}
console.log(addTwoNumber(num1,num2));
var s1='get-element-by-id';
//编写一个函数，把s1变成getElementById
var f=function(s){
    //replace,用正则表达式，/-[a-w]/ ''
    // 正则， 匹配规则
    //  /-\w/正则表达式里面横杠不是正则表达式的一个特殊符号，所以不用写成[-]
    // /-\w/中的\w在正则表达式中是用于查找单词字符，包括a-z,A-Z,0-9以及下划线，用来匹配相匹配的任何字符。    
    //  "get-element-by-id".match(/-\w/)可以用来查看正则表达式里匹配的东西
     return s.replace(/-\w/g,function(x){
        // console.log(x)
        //现在，不要-，并且把-后面的字母变成大写的：
        // 1. return x.charAt(1).toUpperCase()
        // 2. return x[1].toUpperCase()
        return x.slice(1).toUpperCase();
     })
}
// f(s1);
console.log(f(s1));
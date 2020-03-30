//1. 爆栈，不行
// var lastRemaining = function(n, m) {
//     //迭代
//     return iterator(n,m)
// };
// function iterator(n,m) {
//     if(n === 1) {
//         return 0;
//     }
    
//     let x = iterator(n-1, m)
//     return (m+x)%n
// }
var lastRemaining = function(n, m) {
    //2.
    // let x = 0;
    // //???
    // for(let i = 2; i <= n; i++) {
    //     x = (m + x) % i;
    // }
    // return x

    //3.
    const arr = [];
    for(let i = 0; i < n; i++) arr.push(i);
    //用head来指向要删除的元素的下标，每次删除后都后移m个位置（因为如果要删第三个，下标是为2），所以再减一
    let head = 0;
    while(arr.length > 1) {
        head = (head + m - 1) % arr.length;
        arr.splice(head, 1);
    }
    return arr[0];

};

console.log(lastRemaining(5,3));
console.log(lastRemaining(10,17));
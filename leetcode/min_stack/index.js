const arr=[];
arr.push('建宁');
arr.push('曾柔');
arr.push('双儿');
arr.push('阿珂');
//队列 栈 (出栈的元素为pop)
console.log(arr);
const ake=arr.pop();
console.log(arr);
//先进后出
arr.unshift(ake);
arr.unshift('苏荃');
console.log(arr);
const sq=arr.shift();//从数组的队头移出第一个元素
arr.push(sq);
console.log(arr);

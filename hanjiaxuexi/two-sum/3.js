const map=new Map();//映射对象 es6引进的js里面的一种新的数据结构
const obj={P:"helllo word"};
console.log(map.set(obj,'ok'));//obj->key(可以是任何数据类型),'ok'->value
console.log(map.get(obj));//get方法获得对象的值
console.log(map.has(obj));//是否拥有这个key?这些都是以O(1)的时间查询的
console.log(map.delete(obj));
console.log(map.has(obj));
// 改写2.js
var _class;

//装饰一下 @表示decorator
//好多类有共用的属性的时候就可以加装饰器
// node 还不支持，要加个.babelrc文件
let MyClass = annotation(_class = class MyClass {}) || _class;

function annotation(target) {
  //装饰MyClass类，为类多加一个annotated属性 
  // target代表的就是MyClass
  target.annotated = true;
} // 装饰完了之后


console.log(MyClass.annotated);

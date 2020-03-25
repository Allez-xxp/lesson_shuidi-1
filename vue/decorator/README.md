1. 在table中删除前注意要做提醒
2. 阿里的面试题 es7的 decorator 特性
装饰器
很多地方有要被提醒的用户体验，使用装饰器，传统使用Message.confirm提醒，但会使代码重复
以@开头，将一个方法火属性放进去

- function confirmation(target, name, descriptor) {  //参数是@会给的,descriptor本来是什么样的
  //哪里要装饰，就放在哪里
  // console.log(target, name, descriptor);
  let oldValue = descriptor.value;
  console.log(oldValue); //函数装修前 //this.list.splice(index, 1);
  descriptor.value = function(...args) { //原来要做的先写上，我们只是做装修
    // console.log(args); //点了一下删除，就会出来，看做了什么
    MessageBox.confirm('确定要删除吗？', '提示')
      .then(oldValue.bind(this, ...args))  // bind old this
      .catch(()=>{

      })
  }
}

- @confirmation
    handleDelete(index, row) {

# babel-decorator
.babelrc配置文件  proposal是还在提议之中的，所以都要加一个@
yarn add @babel.cli(命令行) @babel/core （最新）@babel/
1. npm init -y (后面的文件才会装上去)
2. yarn add @babel/cli @babel/core  @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators


输出到 index
3. .\node_modules\.bin\babel  .\index.js -o index_compiled.js
记得.babelrc中
["@babel/plugin-proposal-decorators", {  //decorators降级为es5也能执行的
            "legacy":true  //要为true
}],
4.  node ./index_compiled.js
5. 正确返回true
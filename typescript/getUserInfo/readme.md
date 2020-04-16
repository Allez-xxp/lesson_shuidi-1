- 安装typescript
npm i -g typescript
测试： tsc --version
编译：tsc 文件
- ts是js的超级，减低愚蠢的错误，还有那些因为类型缺失导致的很难发现的错误因为他有先编译的功能，它是静态的语言，有类型检测，运行之前可以编译。
- ts大公司很多用，因为他解决了多人协作的问题，比如写一个函数：
getUserInfo()是一个人定义的，加入这个函数是一个基础的公共函数，假设放在utils目录下(一般放工具函数)，定义函数的时候希望调用的时候严格一点，按照缺失（类型检测...)进行强调,这种情况下，要进行约束，约束使用者的-》ts
所以，如果项目是一个中大型的，多人协作一定要使用ts!
ts支持的类型：
https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html
string number 元组 枚举 Null和Undefined Object...

ts是不能被直接运行的

- 要写typescript+react的项目

- 编译ts代码，tsc 2.ts会生成文件-》2.js
ts文件是可以提前编译的在浏览器端，不支持ts，要把ts->js才能执行 
ts编译的过程中可以做错误的检测
检测语法错误、类型错误...
react + ts vue3.0 vue也是用ts写出来的。
- tsconfig.json
ts的编译 可以给他做一些配置项
https://www.tslang.cn/docs/handbook/compiler-options.html
当执行编译的时候就回到这个配置文件中
{
  "compilerOptions": { //编译
      "module": "commonjs",//声明一下模块的类型是commonjs //指定生成哪个模块系统代码
      "noImplicitAny": true, //在表达式和声明上有隐含的 any类型时报错。
      "removeComments": true, //移除评论//代码外部的注释就没有了
      "preserveConstEnums": true, //保留 const和 enum声明
      "sourceMap": true //生成一个sourceMap是webpack中的，源码的映射，根据打包之后的文件，只要点一下就能定位到编译前源代码的位置
  },
}
- type IUsernfoFunc = (user: IUser) => string;
函数 ：参数 返回值
对函数的参数和返回值进行约定还有更高级的版本：type关键字-》类型
定义一个IUsernfoFunc一个获取用户信息的函数类型，(user: IUser) => string; 函数类型
而且这个函数类型需要满足参数类型是IUser（我们定义的一个借接口）,返回值类型是string

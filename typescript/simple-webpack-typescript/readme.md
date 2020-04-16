- ts植入到webpack作为打包工具的vue/react开发框架中
ts->webpack->vue/react
ts是不能够被浏览器运行的，所以他要转变成为js，然后js还需babel一下
ts->js->babel
先初始化一下npm init -y
建立配置文件tsconfig.json 
{
  "compilerOptions": { //编译
    "module": "commonjs", //使用了模块化的技术方案commonjs
    "target": "es5", //编译成es5
    "allowJs": true, //里面允许js
    "lib": [
      "es2018", //es6->2015 es7->2016 es8->2017 es9->2018 es10->2019  ES 2019(ES 10)
      "dom" //js 运行在前端
    ]
  },
  "include": [
    "./src/*" //把这个目录下的所有js文件进行编译
  ],
  "exclude": [ //不放在考虑之内
    "./node_modules" //将这个目录下的所有文件(是第三方库，没必要干涉)
  ]
}
- webpack的配置文件 webpack.config.js


//编译之前需要安装一些东西
// yarn add ts-loader typescript -D//把typescript装到本地来 上线的时候就不用再要typescript了
//yarn add webpack webpack-cli 
//要安装到全局下：.\node_modules\.bin/webpack //执行的时候就会找到根目录下的配置文件去执行
//执行webpack(如果在全局下装的)没有就执行.\node_modules\.bin/webpack
//还能将webpack中的mode改成development 再编译就是一个大函数
//还能运行：node .\dist\app.bundle.js
// PS D:\LESSION_SHUIDI\typescript\simple-webpack-typescript> node .\dist\app.bundle.js
// { name: 'linan', age: 19, hobby: 'coding' }
// //webpack的配置文件，一定要的
// //processnode中的进程全局变量 .env 环境变量
// // console.log(process.env.NODE_ENV);
// // const path = require('path');
// // const rimraf = require('rimraf');
// // rimraf.sync('dist'); //删除已有dist目录 sync同步的意思
// // module.exports = { 
// //     entry: './src/main',  //入口 一定要有的 入口有个index.css 处理不了，从流水线先拿到别的地方处理，处理完了之后再放回来
// //     mode: process.env.NODE_ENV,  //以什么样的模式(是动态的) webpack的编译方式  我们先目前提供了两个develpoment production
// //     output: {  //打包，向外输出结果文件
// //         filename: 'bundle.js',
// //         path: path.resolve(__dirname, 'dist')  //放到哪里去一般是放到dist文件中 path的api:path.resolve()
// //     }
// // }

// //重新讲他是怎么打包的
// const path = require('path');
// const rimraf = require('rimraf');
// rimraf.sync('dist');  //将原来的dist文件删掉
// //链式的webpack配置,让我们的配置可以像链条一样一个一个配置下去
// const Config = require('webpack-chain'); //写webpack配置的新方案 要安装一下
// const config = new Config();//实例化
// const resolve = (src) => {
//     return path.join(process.cwd().src)
// }

// //用chain方式生成一个config
// config
//     .entry('src/main')
//     .add(resolve('src/main.js'))  //添加文件，resolve是fs模块的找到这个文件  这里会返回文件真正的路经
//     .end()
//     .set('mode', process.env.NODE_ENV)  //模式
//     .output
//         .path(resolve('dist'))
//         .filename('[name].bundle.js')  //文件名随bundle.js变化
    
// config.module  //添加一个模块
//     .rule('css')  //添加一个css的处理 
//     .test(/\.css$/)  //所有以css结尾的文件
//     .use('css')
//     .loader()
// //新的
// //之前是输出一个json object
// module.exports = config.toConfig();  //这是webpack-chain的api

const path = require('path');
const rimraf = require('rimraf');
rimraf.sync('dist');
// 链式的webpack 配置
const Config = require('webpack-chain'); 
const config = new Config(); //实例化
const resolve = (src) => {
  // console.log(path.join(process.cwd(), src), '_______')
  return path.join(process.cwd(), src)
}

config 
  .entry('src/index')
    .add(resolve('src/index.js'))
    .end()
  .set('mode', process.env.NODE_ENV)
  .output
    .path(resolve('dist'))
    .filename('[name].bundle.js') // entry main.js  name main  bundle.js

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader('css-loader')

module.export = config.toConfig();

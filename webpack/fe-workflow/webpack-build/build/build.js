// const rimraf = require('rimraf');//编译之前可以清空目录  //开发阶段用的 yarn add rimfaf -D
// const path = require('path');
// const ora = require('ora'); //加载的时候用 加载指示器 //yarn add ora -D
// const chalk = require('chalk');
// //用webpack完成最基本的 entry output mod
// // webpack-chain //利用这个可以将配置变为变成的过程
// // console.log(process.cwd(), __dirname);
// //模块化
// const config = require('./base')(); //负责webpack工作流的启动 //是个函数，将他立即运行
// // console.log(config);
// rimraf.sync(path.join(process.cwd(), 'dist'));
// const spinner = ora('开始构建项目...'); //加载的进度表示
// spinner.start();
// //进行编译
// const webpack = require('webpack'); //yarn add webpack-cli 命令行 webpack 编译 -D
// webpack(config.toConfig(), function(err, stats) {
//     spinner.stop();
//     if(err) throw err
//     process.stdout.write( //向进程输出
//         stats.toString({
//             colors:true,
//             modules:false,
//             children: false,
//             chunks:false,
//             chunkModules: false
//         }) + '\n\n'
//     )
//     console.log(chalk.cyan('build完成\n'));
// })  //生成配置文件

const rimraf = require('rimraf');
const path = require('path');
const ora = require('ora');
rimraf.sync(path.join(process.cwd(), 'dist'));
const spinner = ora('项目开始构建');
spinner.start();
//webpack最基本的 entry output set(mode)
//webpack-chain 帮助我们把webpack配置变成编程的过程 链式调用
//找到配置 应该是一个函数，将他立即运行
const config = require('./base')(); //然后去编写base.js
// console.log(config); 能拿到base.js的返回值
const webpack = require('webpack');
// 将返回的config调用toConfig()生成它的配置文件，就能跟我们直接写webpack.config.js是一样的，编译的结果可能失败可能成功
//这里就在进行编译了
const chalk = require('chalk');
webpack(config.toConfig(), function(err, stats) {
    spinner.stop();
    if(err) throw err
    process.stdout.write( // 向我们的进程输出 写入： (用彩色的粉笔 在stdout中输出)
        stats.toString({  //将结果toString 
            color: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })+ '\n\n' //每一行都换行
    )
    console.log(chalk.cyan('build 完成\n')); //chalk粉笔的意思
})
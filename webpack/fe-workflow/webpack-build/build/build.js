const rimraf = require('rimraf');//编译之前可以清空目录  //开发阶段用的 yarn add rimfaf -D
const path = require('path');
const ora = require('ora'); //加载的时候用 加载指示器 //yarn add ora -D
const chalk = require('chalk');
//用webpack完成最基本的 entry output mod
// webpack-chain //利用这个可以将配置变为变成的过程
// console.log(process.cwd(), __dirname);
//模块化
const config = require('./base')(); //负责webpack工作流的启动 //是个函数，将他立即运行
// console.log(config);
rimraf.sync(path.join(process.cwd(), 'dist'));
const spinner = ora('开始构建项目...'); //加载的进度表示
spinner.start();
//进行编译
const webpack = require('webpack'); //yarn add webpack-cli 命令行 webpack 编译 -D
webpack(config.toConfig(), function(err, stats) {
    spinner.stop();
    if(err) throw err
    process.stdout.write( //向进程输出
        stats.toString({
            colors:true,
            modules:false,
            children: false,
            chunks:false,
            chunkModules: false
        }) + '\n\n'
    )
    console.log(chalk.cyan('build完成\n'));
})  //生成配置文件


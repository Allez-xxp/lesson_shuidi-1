const rimraf = require('rimraf');//编译之前可以清空目录  //开发阶段用的 yarn add rimfaf -D
const path = require('path');
const ora = require('ora'); //加载的时候用 加载指示器 //yarn add ora -D
// console.log(process.cwd(), __dirname); //后者:当前运行的文件所在的目录，前者:项目的根目录
rimraf.sync(path.join(process.cwd(), 'dist'));
const spinner = ora('开始构建项目...'); //加载的进度表示
spinner.start();




const rimraf = require('rimraf');//编译之前可以清空目录  //开发阶段用的 yarn add rimfaf -D
const path = require('path');
const ora = require('ora'); //加载的时候用 加载指示器 //yarn add ora -D
// console.log(process.cwd(), __dirname);
rimraf.sync(path.join(process.cwd(), 'dist'));
const spinner = ora('开始构建项目...'); //加载的进度表示
spinner.start();

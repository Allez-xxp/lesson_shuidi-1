//唯一的入口，做唯一一次es5模块化 辛苦一下 然后app.js就能直接用es6的模块化了
// 为node引入es6的模块化
// register挂载es6高级能力
// yarn add @babel-core/register
// 转义脚本 yarn add @babel/cli安装某某命令行-》安装js命令行 写的时候yonges6 import->babel 编译成es5
// yarn add @babel/cli @babel/core babel-preset-env
require('@babel/register');
require('./app.js');
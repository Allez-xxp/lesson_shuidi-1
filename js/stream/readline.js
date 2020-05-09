// 读取输入
// 有一个内置的包readline
// const readline = require('readline');
// // 命令行交互怎么做? createInterface
// // 还可以有个提示的
// console.log('请开始输入，回车结束');
// const rl = readline.createInterfa/ce({ //要配置输入输出
    // input:process.stdin, //标准输入
//     out:process.stdout //标准输出 输出到屏幕上
// })
// // 输入输出也是流
// // 当输入数据的时候，会监听一个line事件，能监听到当前输入那一行的信息
// rl.on('line', function(lineData) {
//     console.log(lineData);//输入什么 输出什么 回车就是一行
// })

// 日志处理。逐行读取日志怎么实现
const readline = require('readline');
const fs = require('fs');
// 命令行交互怎么做? createInterface
// 还可以有个提示的
console.log('请开始输入，回车结束');
const rl = readline.createInterface({ //要配置输入输出
    input:fs.createReadStream('./readme.md'), //来源于文件的可读流
})
// 输入输出也是流
// 当输入数据的时候，会监听一个line事件，能监听到当前输入那一行的信息
rl.on('line', function(lineData) {
    console.log(lineData);//输入什么 输出什么 回车就是一行
})

// 如果不使用流的话，先把一个大文件一次性读完，然后按行切割，这个对于大文件就很不好
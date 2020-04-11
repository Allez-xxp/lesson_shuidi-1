//需要向外输出函数
//findsync查找配置文件config中的文件 递归查找配置文件挂载到webpack-chain上面
let fs = require('fs');
let join = require('path').join; //把join函数放给join

function findSync(startPath) {
    let result = [];
    function finder(path) { //形参 动态的 因为要递归调用
        let files = fs.readdirSync(path); //同步执行
        //读出的要判断是文件还是目录
        files.forEach((val, index)=>{
            let fPath = join(path, val); //将当前目录当成父目录
            let stats = fs.statSync(fPath); //得到文件的状态信息
            if(stats.isDirectory()) finder(fPath)
            if (stats.isFile()) result.push(fPath)
        });
    }
    finder(join(process.cwd(), startPath));
    return result;
}
// 不是默认整个模块输出 我们用下面这个模块输出（使用花括号的 module.exportss不能用{}）
exports.findSync = findSync

//复习
// const fs = require('fs');
// const path = require('path');
// let join = require('path').join

// function findSync(startPath) {
//     let result = [],
//     function finder(path) {
//         let files = fs.readdirSync(path);
//         files.forEach((val, index)=> {
//             let fpath = join(path, val);
//             //得到文件的状态信息 用来判断是文件还是目录
//             let stats = fs.statSync(fpath); 
//             if(stats.isDirectory()) finder() //递归
//             if (stats.isFile()) result.push(fpath)
//         });
//     }
//     finder(join(process.cwd(), startPath))
//     return result;
// }
// //不默认整个模块都输出 引入的时候以花括号 动态的引入
// exports.findSync = findSync
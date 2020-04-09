const { findSync } = require('../lib'); //工具函数，找出所有配置文件
const Config = require('webpack-chain'); //webpack的新引入 不是在用webpack.config.js //yarn add webpack-chain -D
const config = new Config(); //负责webpack-chain的配置 //启动一个配置实例
const path = require('path');
//抽离成一个公共函数 只有一个参数
const resolve = src => {
    return path.join(process.cwd(), src)
}
const files = findSync('config'); //传要查找的目录的名字 会join成一个物理路径
console.log(files);
module.exports = () => {
    // console.log('在这里做基本配置吧');
    config
        .entry('app') //入口 模块的开始
            // .add(path.join(process.cwd(), 'src/main.js')) //入口 
            .add(resolve('src/main.js'))
            .end()
        .set('mode', process.env.NODE_ENV) //运行模式
        .output
            .path(resolve('dist'))
            .filename('[name].bundle.js'); //[]表示变量 我们打包后的就是bundle
    return config
}
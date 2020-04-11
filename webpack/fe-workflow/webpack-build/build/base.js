//只做编译目录
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
//利用files(使用了)拿到config/*.js

module.exports = () => {
    // console.log('在这里做基本配置吧');
    // config
    //     .entry('app') //入口 模块的开始
    //         // .add(path.join(process.cwd(), 'src/main.js')) //入口 
    //         .add(resolve('src/main.js'))
    //         .end()
    //     .set('mode', process.env.NODE_ENV) //运行模式
    //     .output
    //         .path(resolve('dist'))
    //         .filename('[name].bundle.js'); //[]表示变量 我们打包后的就是bundle

    // 怎么把这些文件都webpack config化呢？
    //可拔插的关键
    const map = new Map(); //es6的Map 和json的区别？key不限任何类型 json能用String做可以
    //重新files 组织一下这个数组
    files.map(file => {
        const name = file.split('/').pop().replace('.js', '');  //切割//最后一个弹出//
        // console.log(name, '======') //得到文件名 去掉后缀了的
        //require进来的文件就是把js后缀去掉了的 并且把config 和 resolve传进去，然后config/*.js里面的参数就有值
        //然后那些config/*.js文件就被require进来了，这样就联系起来了。并且立即执行
        console.log(require(file).toString(), '++++++++++')
        return map.set(name, require(file)(config, resolve));  //map有hashMap的方法 //value的部分是require引入的文件
    }) 
    //map中的值其实就是函数，（模块化导出的）
    console.log(map, 'map--------') //这里不会直接把function里面的代码打出来 不过可以用function.toSting()
    //遍历里面的每个函数，只把它的值进行forEach,是个函数 加上()就能运行了
    //分模块的配置就上去了
    map.forEach(v=> v())

    return config
}

//复习用的:
// // 工具函数findsync帮我们把所有的配置文件都找出来
// const { findsync} = require('../lib')
// const Config = require('webpack-chain'); //负责webpack-chain的配置
// const config = new Config() //是webpack的使用方式，启动配置实例
// //使用这个实例就能用编程的方式，不是配置的方式嵌入到webpack的使用中来
// //因为需要找路径：
// const path = require('path');
// //抽离里面用到的路经变成一个函数，之后可以复用
// const resolve = src => {
//     return path.join(process.cwd(), src);
// }

// //要是一个函数，能立即运行
// module.exports = () => {
//     //先随便写一点东西
//     // console.log('这里做基本配置吧base'); //然后build那里引入的时候，可以执行了
//     //对entry的设置
//     config
//         entry('app') //入口名称
//             .add(resolve('src/main.js'))
//             // .add(path.join(process.cwd(), 'src/main.js'))   //添加入口，要把文件的物理路经给他
//             .end() //结束entry
//         .set('mode', process.env.NODE_ENV) //设置mode运行的模式 是开发模式 还是上线模式
//         .output    //向外输出的路经
//             .path(resolve('dist'))
//             // .path(path.join(process.cwd(), 'dist')) //向外输出的路经
//             .filename('[name].bundle.js')  //[]表示变量就能自己设置名字，就是entry('app')这里 webpack打包出来的就是一个bundle.js
//     return config;
//     //为什么要返回config  base.js就做基本的配置，然后向外输出，负责使用webpack-chain将我们的工作链起来

// }
// //webpack-chain： webpack 在3，4新引入的包，可以让webpack更多的能够嵌入到编程的细节中

// // 不同的文件应该怎么处理 比如js文件用babel处理 这是用webpack modules来区分的 根据不同的模块进行相应的操作
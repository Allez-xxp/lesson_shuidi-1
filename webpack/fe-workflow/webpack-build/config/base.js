//所有的webpack配置 都放在config目录中
//函数 运行函数 闭包
// 以可拔插的方式提供对静态资源的处理，将src下的文件以某种方式让他能被运行
// 可拔插的结构 把config(配置文件)负责提供webpack-chain的单一实例 resolve(路经)传进来 来自webpack -chain
module.exports = (config, resolve) => { //resolve是我们的路经
    return ()=>{
        config
        .entry('app') //入口 模块的开始
            // .add(path.join(process.cwd(), 'src/main.js')) //入口 
            .add(resolve('src/main.js'))
            .end()
        .set('mode', process.env.NODE_ENV) //运行模式
        .output
            .path(resolve('dist'))
            .filename('[name].bundle.js'); //[]表示变量 我们打包后的就是bundle
    }
}

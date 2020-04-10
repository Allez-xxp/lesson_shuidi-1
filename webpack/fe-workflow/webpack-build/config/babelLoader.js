// 在base config之后 插上babel处理
// 首先模块化 手搭工作流程 使用webpack-chain
// config提供单一实例
module.exports = (config, resolve) => {
    // return () => { //这是一个闭包
        //babel的js化
        //webpack使用module（就是每一个生产单元，每个module负责一个任务）
        const baseRule = config.module.rule('js').test(/.js|.ts$/);  //基本的原则 匹配文件进行相应的处理
        const babelPath = resolve('babel.js')  //没有使用.babelrc的原因
        const babelConf = require(babelPath); //通过得到的路经去引入文件 //变成一个js
        //现在就是要对js进行babel化
        console.log(babelConf, '----------')
        //理解
        const version = require(resolve('node_modules/@babel/core/package.json')).version;
        //得到我们现在用的babel-loader的version
        console.log(version, '++++++');
        return () => {
            baseRule
            .use('babel')
            //将js文件
            .loader(require.resolve('babel-loader'))  //引入并执行 //babel就启用起来的了
            .option(babelConf({
                version
            })) //然后就能编译了
        }

    // }
}
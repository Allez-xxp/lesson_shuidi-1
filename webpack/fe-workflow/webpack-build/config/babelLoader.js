// 在base config之后 插上babel处理
// 首先模块化 手搭工作流程 使用webpack-chain
// config提供单一实例
module.exports = (config, resolve) => {
    // return () => { //这是一个闭包
        //babel的js化
        //webpack使用module（就是每一个生产单元，每个module负责一个任务）
        //基本原则，匹配文件进行相应的处理

        //ts->js->env的js
        const baseRule = config.module.rule('js').test(/.js|.ts$/);  //基本的原则 匹配文件进行相应的处理
        const babelPath = resolve('babel.js')  //用resolve把跟目录下的文件引入进来 //没有使用.babelrc的原因
        //引入的文件babel.js
        const babelConf = require(babelPath); //通过得到的路经去引入文件 //这里就变成一个js
        //上面就相当于已经拿到了Babel的配置，现在就是要对js进行babel化
        console.log(babelConf, '----------') 
        //理解
        const version = require(resolve('node_modules/@babel/core/package.json')).version;
        //得到我们现在用的babel-loader的version
        console.log(version, '++++++');
        return () => {
            console.log(babelConf({version})); //"presets:..."
            baseRule   //const -> var
            .use('babel')  //就好像使用一个中间件
                //将js文件 然后将我们这里引入的babel.js和babelLoader.js与build/base.js串起来
                .loader(require.resolve('babel-loader'))  //引入并执行 //babel就启用起来的了
                .option(babelConf({ //然后就能编译了//babel-loader将js文件
                    version
                })) //babelConf得到的是一个函数 可以被运行 运行后得到的就是一个json配置项(presets)
                //然后放到config中去，作为css模块的一个babel编译的loader 这个选项交给他 是想编译成es5还是...
        }

    // }
}
//webpack处理流程：
// 有好多个rule，好多个处理流程都要解决
// build/base.js

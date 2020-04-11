// babel 提供一些js的 编译 
//yarn add @babel/cli @babel/core @babel/preset-env babel-loader -D(将js文件加载到babel的配置声明中进行相应的，由babel/core来预处理)
//然后将结果输出到app.bundel.js文件中
//为什么不是.babelrc?
//向外输出一个
module.exports =function({ version }) {
    console.log(version,'version++');
    //返回的配置项
    return {
        'presets': [   //预处理
            [
                '@babel/preset-env', //按照编程环境进行相应的编译 //后面的第二个参数就能进行手动指定环境
                {
                    targets: { //编译是为了某个目的编译的  根据不同的版本编译
                        chrome : 59, //支持chrome59版本以上 
                        edge: 13,  //IE最新的浏览器windows上用的比较多
                        firefox: 50,
                        safari: 8  //苹果上的
                    }
                }
            ],
            //再加一个预处理，处理ts
            [
                '@babel/preset-typescript',
                {
                    allExtension: true //支持所的扩展名  //.ts  .tsx
                }
            ],
            
        ] ,
        //再加插件的声明
        plugins: [
            '@babel/plugin-transform-typescript'
        ]
    }
}
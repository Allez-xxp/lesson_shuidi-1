// babel 提供一些编译
//为什么不是.babelrc?
module.exports =function() {
    //返回的配置项
    return {
        'presets': [   //预处理
            [
                '@babel/preset-env', //按照编程环境进行相应的编译 //后面的第二个参数就能进行手动配置环境
                {
                    targets: { //编译是为了某个目的编译的
                        chrome : 59, //支持chrome59以上 苹果上用的比较多
                        edge: 13,  //IE最新的浏览器windows上用的比较多
                        firefox: 50,
                        safari: 8  //
                    }
                }
            ]
        ] 
    }
}
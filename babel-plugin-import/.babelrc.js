const Import = require('./index'); //插件所在的位置
// 导出插件
module.exports = {
    plugins: [ //是个数组，里面放插件
        [Import, {a:1, b:2}] //后面就是我们的配置
    ]
}
//要append到页面上去 那就需要一个html才能执行body 挂载点

const HtmlWebpackPlugin = require('html-webpack-plugin');  //yarn add html-webpack-plugin

module.exports = (config, resolve) => {
    return () => {
        config.plugin('html') //html是通过插件来处理的，js css 图片处理是通过module来处理的
        .use(HtmlWebpackPlugin, [{
            template: 'public/index.html'
        }])
    }
}
comst HtmlWebpackPlugin = require('html')
module.exports = (config, resolve) => {
    return () => {
        config.plugin('html') //html是通过插件来处理的，静态资源是通过
        .use(HtmlWebpsckPlugin,[{
            template: 'public/index.html'
        }])
    }
}
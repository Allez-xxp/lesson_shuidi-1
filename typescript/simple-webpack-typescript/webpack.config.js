//在这里解决.ts和.tsx后缀的
const path = require('path');

module.exports = {
    // mode: 'production' || 'development',
    mode: 'development',
    entry: {
        index: './src/app.ts'
    },
    output: { //指定静态文件输出到哪里去
        //相当于koa中的静态服务器
        publicPath: __dirname + "/dist/", //等下webpack-server在启动8080端口时publicPath下的所有文件都能被访问
        path: path.resolve(__dirname, "dist"), //输出打包的路经
        filename: "app.bundle.js"
    },
    module: {
        rules: [
            //添加模型处理
            {
                test: /\.tsx?$/,  //这个？就可以用来支持tsx
                use: 'ts-loader', //没有使用aothor-typescript-loader
                exclude: /node_module/ //这了还要再写一个，因为在webpack中也会做一次配置
            }
        ]
    },
    resolve: {
        extensions: ['.ts', 'js']
    }
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = __dirname;

module.exports = {
 context: path.join(basePath, 'src'), //设置一个像koa一样的上下文环境 定位在src目录
 resolve: { //帮处理哪些静态文件
   extensions: ['.js', '.ts', '.tsx'],  //以后缀名作为声明 ts ts也是一种后缀，是js的超集 还能声明.style .css
 },
 entry: {
   app: './index.ts', //入口 不只是一个 webpack的打包入口可以有多个
   vendorStyles: [   //bootstrap是css的一个框架 用到了那就也要打包//开发的时候主要的是业务代码在改变，但是项目的框架是要被打包的，但是不会被修改
     '../node_modules/bootstrap/dist/css/bootstrap.css', //../有了上下文环境后的好处 //css的打包入口
   ], //但是应该和业务代码区分开来，单独打包
 },
 output: {
   path: path.join(basePath, 'dist'),
   filename: '[name].[hash].js', //一定是app  hash值唯一地标志打包的hash
 },
 module: {  //异步的 加工厂 根据不同的后缀加工 根据不同后缀的文件进行不同的打包
   rules: [ //test规则
     {
       test: /\.ts$/,
       exclude: /node_modules/, //要装
       loader: 'awesome-typescript-loader',  //ts->js ->env的js (react中显示ts的一个标配，然后再由它来babel)
       options: {  //一个选项  .ts->.js->babel
         useBabel: true,
       },
     },
     {
       test: /\.css$/,
       use: [MiniCssExtractPlugin.loader, 'css-loader'],  //可以将css文件压缩
     },
    //  {
    //    test: /\.(png|jpg|gif|svg)$/,  //将图片进行压缩，不会影响质量 base-64最好
    //    loader: 'file-loader',
    //    options: {
    //      name: 'assets/img/[name].[ext]?[hash]',  //hash是什么？
    //    },
    //  },
   ],
 },
 // For development https://webpack.js.org/configuration/devtool/#for-development
 devtool: 'inline-source-map',
 devServer: {  //webpack-dev-server依赖编译的同时能启动服务器，还能热更新
   port: 8080,
   noInfo: true, //b不要提示信息
 },
 plugins: [  //插件
   // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
   new HtmlWebpackPlugin({  //带有钩子的root在哪里
     filename: 'index.html', // Name of file in ./dist/
     template: 'index.html', // Name of template in ./src
     hash: true,
   }),
   new MiniCssExtractPlugin({ //css压缩
     filename: '[name].css',
     chunkFilename: '[id].css',
   }),
 ],
};
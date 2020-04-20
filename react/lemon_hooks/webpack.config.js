var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var webpack = require("webpack");
var path = require("path");

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  entry: ["@babel/polyfill", "./index.tsx"], //多入口
  output: {
    path: path.join(basePath, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map", //源码映射，有助于调试的 .styl .ts文件 开始写的代码和最后的是不一样的，在调试的时候需要找源码，  
  devServer: {
    contentBase: "./dist", // Content base
    inline: true, // Enable watch and live reload
    host: "localhost",
    port: 8080,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core" // needed for Babel v7
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader?sourceMap"] //css想要源码编译
        // 1.样式从js文件中单独抽离出来 不抽也能执行，因为css最为style的text看可以完全的在js中寄生，但是编译的时候我们还是希望抽出来，为下一步能压缩和css能单独的编译进行调试做准备
        // use: [MiniCssExtractPlugin.loader,"css-loader"]  //loader进css-loader的方案，然后换一种方案-》minicss 
        // 这是个plugin，这个插件能实现将css从js文件中抽出来，使用mini插件的定义，
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/img/[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true
    }),
    new MiniCssExtractPlugin({ //它既是一个loader，又是一个插件
      filename: "[name].css", //定义抽出来的文件叫什么名字，跟文件名相关
      chunkFilename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin() //2.对css的优化，optimize（优化）css资源的插件
  ]
};



// module.exports = {
//     entry: [ //多入口
//         "@babel/polyfill", //打补丁,打包了之后放到index.tsx
//         "./index.tsx"
//     ]
// }
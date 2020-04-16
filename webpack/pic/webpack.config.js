const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, './dist')        
    },
    module: {
        rules: [{
            test: /\.css$/, //为什么要有这个？
            use: [ //使用一个中间件
                //这里是动态的，不同的项目，需求不一样 就像loader不一样 出来的东西也不一样
                //loader
                
                'style-loader', //生成静态资源内连，打包后可以给外部应用去用
                {
                    loader:MinicssExtractPlugin.loader, //可以将我们的css代码中抽离出来 css太多的话干脆并发（js是天生并发的）
                    options: {
                        publicPath: '../', //定位在src下
                        hrm: process.env.NODE_ENV=== 'development', //希望能热更新
                        reloadAll:true //一直加载，边写边刷新
                    }
                },
                'css-loader' //处理css文件
            ]
        },{
            test: /\.(png|jpe?g|gif|png|webp)$/,  //webp一般的图片压缩20%，质量不受损，是图片的一种优化
            use: [
                {
                    loader:'url-loader', //可以导入一个本地文件或远程文件
                    options: {
                        name: "[name].[hash:8].[ext]", //图片也要hash? 网站改版了，图片也要更新
                        outputPath: 'imgs/',
                        limit: 10240 //添加上限 字节 10kb
                    }
                }
            ] 
        },{
            test: /\.styl(us)?$/, //可以是styl的前缀或简写
            use: [
                {
                    //剥离出去，生成独立的文件 //最后一步
                    loader: MinicssExtractPlugin.loader, //先把stylus文件拖到stylus-loader去解决
                    options: {
                        publicPath: '../',
                        hrm: process.env.NODE_ENV === 'development',
                        reloadAll:true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2 //在css-loader前执行的loader数量
                    }
                },
                {
                  loader: 'postcss-loader', //css中的新的特性，可以把css像babel一样用起来
                  options: {
                    //为编译的文件加上必要的前缀
                    indent: "postcss",
                    plugins: loader => [ //引入了postcss后给一些配置选项
                        require('autoprefixer')({ //有了之后不用再写前缀兼容了，自动的给css3的特性比如transform自动的添加前缀
                            browsers:['>0.15% in CN'] //中国境内85%以上的浏览器覆盖率
                        }) 
                    ]
                  }  
                },
                {
                    //得先执行stylus-loader，才能把stylus文件编译成为css文件
                    loader: 'stylus-loader', //使用的时候会优先使用webpack来解析路径
                    options: {
                        preferPathResolver: "webpack"
                    }
                }
            ]
        },{ //处理字体
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          }]
    },
    devServer: {
        port:'8080' //有了这个，就需要去启动一个网页
    },
    plugins: [
        new HtmlWebpackPlugin(), //不指定html
        new MinicssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].[hash:8].css' //作为区块去压缩
        })
    ]
}
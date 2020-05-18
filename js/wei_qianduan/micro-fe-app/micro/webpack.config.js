const webpackSystemRegister = require('webpack-system-register');  //然后放到插件中 new一下就行
const path = require('path'); //node中的path模块
module.exports = {
  entry: {  //要加入口
    Pay: path.join(__dirname, './Pay.jsx')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/, //排除这个外面的
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpackSystemRegister({}) //传个空对象进去（全部默认的），他这里是可以放参数的，

  ]
};
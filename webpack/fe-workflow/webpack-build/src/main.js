// console.log('长安歌');
require('./src/index.css')
// 2. 引入css文件 webpack bundler 一切静态资源皆可打包
//const es6->es5  babel有个env 按环境进行预处理
const h2 = document.createElement('h2');
h2.innerText = "testaaa";
h2.className = 'test'; //动态的设置一个类名
//3. 需要一个挂载点 html webpack会制定一个模板template

document.body.append(h2);
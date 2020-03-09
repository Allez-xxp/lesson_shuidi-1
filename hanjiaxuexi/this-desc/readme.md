# this
1. js在创建上下文执行的时候就生成了this
2. 创建index.html(浏览器打开)，不是index.js(终端打开)
在非严格模式下，浏览器的指向的是window,严格模式下，浏览器指向的是undefined
在终端node，node的全局指向的是global，不是window,所以要看this的作用域是不是指向window的话，在node的运行环境下是看不出来的,所以创建html文件。
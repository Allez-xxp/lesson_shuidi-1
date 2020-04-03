const app = require('./app'); //引入刚刚封装的模块 app.js

//模拟中间件的执行
//传的一定要是个函数
// app.use('fsfsf')
//如何按顺序执行
app.use((next)=> { 
    console.log(1) //执行
    next()
    console.log(2)
}) 
app.use((next)=> { 
    console.log(3) //执行
    next()
    console.log(4)
}) 
app.use((next)=> { 
    console.log(5) //执行
    next()
    console.log(6)
}) 
app.compose();
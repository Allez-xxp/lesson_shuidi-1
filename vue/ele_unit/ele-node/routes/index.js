// 这里的模块化跟我们的vue不一样，因为node原生支持的是common.js规范 es6是export default
const admin = require('./admin') //建一个admin.js文件
module.exports = app =>{//接受外面穿过来的app
    //启用路由中间件，把路由这一块的设置从入口文件放到它该放的位置
    // app.use('/',(req,res)=>{ //如果是根路由
    //     res.send('hello');
    // })
    //模块化子路由
    app.use('/admin',admin) //若请求的地址试以/admin开始的话，就交给admin处理,admin一定得是个函数！
}
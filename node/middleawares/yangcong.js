const Koa = require('koa');
const app = new Koa();

// 中间件中可以处理异步问题
//文件的中间件 formidable，可以取出文件数据和表单数据
//中间件的数据结构是什么样的：
const one = async (ctx, next) =>{
    console.log('>> one');  //表示从上到下走
    next(); //这是第一个中间件，做完了就往后抛
    //所以这里第一次会不执行
    console.log('<< one'); //回来
}
const two = async (ctx, next) =>{
    console.log('>> two');  //表示从上到下走
    // ctx.body = 'hello tow' //结束 这样就不会404
    next(); //这是第一个中间件，做完了就往后抛,没有后面的就不做
    console.log('<< two'); //回来
}
const three = async (ctx, next) =>{
    console.log('>> three');  //表示从上到下走
    next(); //这是第一个中间件，做完了就往后抛，执行下一个中间件， 
    //走到这个的时候没有找到出口就会回流  
    //出栈 
    console.log('<< three'); //回来
}
app.use(one);
app.use(two);
app.use(three);

app.listen(3000);
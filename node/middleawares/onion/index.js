const Koa = require('Koa');
const app = new Koa();

//中间件 就是一个函数 next就是串联的
app.use(async (ct,next) => {
    console.log(1);
    await next()
    console.log(2)
});

app.use(async (ct,next) => {
    console.log(3);
    await next()
    console.log(4)
});

app.use(async (ct,next) => {
    console.log(5);
    await next()
    console.log(6)
});

app.listen(3000);
//为中间件服务的app
const app = {
    //是个数组 为app提供服务 满足了顺序执行 可以是一个栈，现在是空的 往里面放函数，数组的每一项是函数
    middlewares: []
}

app.use = function(fn) {
    if(typeof fn !== 'function'){
        throw new Error('中间件要是一个函数');
    }
    app.middlewares.push(fn);
}

//合并 compose函数
// 中间件最后会合并成一个大函数
app.compose  = function(next) {
    // for (let i =0; i < this.middlewares.length; i++) {
    //     this.middlewares[i](); //执行，用了一个立即执行函数
    // }

    // 不用for循环，怎么实现串联执行 要不要往下传由session决定，用for会全部连着走
    //把往后走的权力交给每个函数本身
    // yield 异步问题的

    // 一定要执行第一个，由第一个决定是否要next
    // 用递归
    function dispatch(index){
        console.log('----------compose')
        if(index === app.middlewares.length) return;
        const fn = app.middlewares[index]; //通过index拿到当前的中间件
        // console.log(fn);  //执行了第一个
        //然后第一个函数决定后面的函数要不要执行
        fn(function next() {
            dispatch(index+1)  //递归调用
        });
        //next 要交给第二个函数去执行 要传过去 也是一个函数
    }
    dispatch(0)
}


module.exports = app;
//然后就可以引入

//中间件要可以在每一次的ctx req+res 
//要让api可以被use，每个api函数 要有一个use函数 middlewares push

// - 使用过web worker来计算hash html5里面浏览器新创建的对象，他就是新创建线程的
const http = require('http');
const fork=require('child_process').fork;//同过fork方法就可以去创建一个新的进程，专门打理计算事务。
//具体的计算方法剪切到fork_compute.js文件中

http.createServer((req,res) =>{
    //现在把计算任务交给子进程去做
    // 跟web worker类似，它是在新的文件中创造一个子进程
    const compute =fork('./fork_compute.js');
    //假如有一个要计算的东西
    // const sum = longComputation();创造了子进程，代码就不在这里运行了
    compute.send('开启一个新的进程吧');
    compute.on('message',sum =>{ //新的进程计算完成后回调message
        res.end(`sum为${sum}`);
    }) 
}).listen(1315,() =>{
    console.log(process.pid) //process对象就是进程对象，此时process.pid就是当前主进程的id
});
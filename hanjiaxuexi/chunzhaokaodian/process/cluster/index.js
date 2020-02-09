// cluster是node的一个模块
const http=require('http');
//clild_process和cluster的主要任务都是将我们的服务器充分利用起来
//把当前服务器的性能利用起来 CPU 多核
const numCPUS=require('os').cpus().length;
const cluster= require('cluster');

// cluster有一个API
if(cluster.isMaster){ //主进程 负责调度子进程
    //不需要为我们的响应服务,只要做下面的任务：
    for(let i = 0;i<numCPUS;i++){
        cluster.fork();//cluster的fork方法，创建子进程
    }
} else {
    //不是主进程时
    //web天生是多线程多进程的
    http.createServer((req,res)=>{
        res.writeHead(200);
        res.end(`hello word ${process.pid}`);
    }).listen(8000)
}
const cluster = require('cluster');//直接启动多进程
const os=require('os');//可以告诉电脑有几核
//console.log(os.cpus().length);有几个CPU
if(cluster.isMaster){
    for(let i=0;i<os.cpus().length/2;i++){
        //不做具体执行
        cluster.fork();
    } 
}//cluster.isMaster当前运行的进程在主进程时//不用全部的多核，除以二
else {
    require('./app');
}
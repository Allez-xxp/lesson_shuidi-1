//process node进程的全局变量
process.on('message',(str)=>{
    console.log('child ' + str);//现在有两个process了
    //子进程，把活给干了后，子进程可以偷偷的跑到另一个CPU上挂载一个进程，可以把多核能力应用起来
    process.send('hehe');
})
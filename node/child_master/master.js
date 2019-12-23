//主进程
// 程序的入口从这里启动
const cp=require('child_process');//创建子进程
// 每个cpu都是多个运行的程序单元，fork一个子进程
const child_process=cp.fork(__dirname + '/child.js');//__dirname会返回项目的物理路径
// fork再挂起一个新的进程 cp.fork启动子进程
// 举例-公司是：
// 天下没有难做的生意，
// 18人，是员工
child_process.send('hah');//表示以后有很多耗时的任务要交给它
// child_process.send('hah');给子进程发送hah
child_process.on('message',(str)=>{
    console.log('parent',str);
})
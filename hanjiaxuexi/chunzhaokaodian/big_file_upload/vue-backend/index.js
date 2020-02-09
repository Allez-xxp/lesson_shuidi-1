const http= require('http');
const server=http.createServer();
const Controller=require('./controller');
const controller=new Controller(); //路由交给controller层

server.on("request",async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*"); //解决跨域问题的一种方法，在头部信息里返回有没有权限去控制的时候返回*,就是说任何人都有可以访问
    res.setHeader("Access-Control-Allow-Headers","*");
    // https://blog.csdn.net/zhuwinmin/article/details/78373732
    // 加上这个原生的res.on;res.end就能拿到data数据了
    // index.js就会输出：end {"filename":"yb.jpeg","fileHash":"24b42dbd786fbd1bcdac21be9c77de70"}
    if(req.method==='OPTIONS'){
        res.status=200;
        res.end();
        return;
    }
    if(req.url=='/verify'){
        // res.end('verify'); //进3000端口看返回值
        await controller.handleVerifyUpload(req,res)
        // controller层,会根据请求对象获取请求的数据再根据res结束本次请求返回数据给用户
    }
 //传递的地址对应着xhr输出的network的地址写：根路径下
    if(req.url=='/'){
        //上传切片处理 交给controller去做
        await controller.handleFormData(req,res);//然后去controller.js
    }

    //续：把之前做的合并文件的移过来,先去index.js添加if
    if(req.url == '/merge'){ //前端在所有切片发送到了之后请求一下合并
        // 交给路由（controller),进行分层，由controller处理细节
        await controller.handleMerge(req,res);
        return; //然后去controller.js,添加一个handlemerge方法

    }
})
server.listen(3000,()=>console.log("正在监听3000端口"));
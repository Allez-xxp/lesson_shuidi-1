// 实例化MONGO  要安装Mongodb  mongodb是我们的数据库驱动 MySQL
var MongoClient=require('mongodb').MongoClient;
// 用URL连接
// mongodb://是个协议 用于mongodb连接 :27017数据库所在端口 MySQL端口是3306 runoob是个数据库
var url='mongodb://192.168.31.128:27017/runoob';
MongoClient.connect(url,{
    useNewUrlParser:true
},function(err,db){
    if(err){
        throw err;//抛出异常

    }
    // console.log('数据库已创建！');

    var dbbase=db.db("runoob");
    //创建集合hhl_site 用函数回调结果
    //查询数据库是异步？回调方案 第一个参数err是node的习惯
    //创建要时间 若db.close();在外面 则不等待创建，不等待回调函数，先close。因为是异步的原因。
    // dbbase.createCollection('hhl_site',function(err,res)
    // {
    //     // 回调先处理错误 异步就是要先等等
    //     if(err){
    //         throw err;
    //     }
    //     console.log('创建了集合！');
    //     db.close();//放里面，创建完了集合再关闭
    // })
    // db.close();不能放在外面

    // 插入数据：
    // json Object
    var myObj={name:'潘志伟',
    url:'www.runoob'};
    // dbbase
    //     .collection("hhl_site")
    //     .insertOne(myObj,function(err,res)
    // {
    //     if(err){throw err; }
    //     console.log('文档插入成功')

    //     db.close()
    // })
    dbbase.collection("hhl_site")
    .find({"name":"潘志伟"})
    .toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        db.close();
    })
    
})
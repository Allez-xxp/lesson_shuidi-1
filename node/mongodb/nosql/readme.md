NOSQL
NOSQL 关系数据库
database->table->fieds
NOSQL不需要写SQL语句
JSON object{} .save()
find({})
碎片化的，结构型不是很好的数据存储
Mongodb云开发数据库就是线上的
npm init -y//初始化
npm install mongodb//安装mongodb

mongodb API式 支持JS语法解析
db.orders.find({})//查询语句 不需要SQL语句

-MYSQL                 MONGODB
关系型数据库            NOSQL 新生的数据库
（表与表之间的关系）     由Facebook所创 碎片化 文档型
show databases         show dbs;
use db;                use db;
tables;表              collections;集合
查询:用SQL语句          查询:支持js语法的面向对象的api

连接数据库mongodb
用url（拥有mongodb协议mongodb://）
创建数据表用db.createCollection('site',function(err,res)
{
    //先处理err，因为是第三方易出错，所以先报错
    //因为是异步的，耗时的。异步的，所以Js里执行的代码不会阻塞
    //db.close();放里面，防止提前关闭数据库
})
代码顺序：
1.createCollection
2.db.close()在外面
执行顺序：
1.create ->去到mongodb去->create,然后->回来跟我说
2.js不等待，接着执行之后的代码
//所以db.close();放里面，防止提前关闭数据库

数据库，后端开发框架express 
express用法：
在node中，后端就是一个APP
app.listen(3000,)//在3000端口上等待请求var url='mongodb://192.168.31.128:27017/runoob';
app.get('/',(req,res)=>)//箭头函数，都是一个请求，一个回复
res.send('hello word');//回复
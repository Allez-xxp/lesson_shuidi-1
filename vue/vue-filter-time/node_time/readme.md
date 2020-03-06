时间处理在后台时怎么做，有什么地方是需要后台处理时间的？
数据存储比如 mongodb中
https://www.runoob.com/mongodb/mongodb-aggregate.html

> Date()
Thu Mar 05 2020 17:53:54 GMT+0800 本地化的当前时间
> new Date() //得到ISO的时间戳
ISODate("2020-03-05T09:55:10.737Z") mongodb中的日期格式
两者相差了8个多小时，是中国东八区时区
> typeof Date()
string
> typeof new Date()
object
> ISODate("2020-03-05T09:55:10.7327Z").valueOf() 国际事件格林尼治时间
1583402110733 
用new Date(1583402110733) 能得到我们要的时间
> ISODate("2020-03-05T09:55:10.7327Z").toLocaleString()
Thursday, March 05, 2020 17:55:10
返回当前本地化时间

> Date();
Fri Mar 06 2020 17:42:19 GMT+0800
> new Date();
ISODate("2020-03-06T09:42:26.680Z")
> ISODate("2020-03-06T09:42:26.680Z").toString();
Fri Mar 06 2020 17:42:26 GMT+0800
> ISODate("2020-03-06T09:42:26.680Z").toLocaleString();
Friday, March 06, 2020 17:42:26
> ISODate("2020-03-06T09:42:26.680Z").valueOf();
1583487746680
> Date(1583487746680);
Fri Mar 06 2020 17:44:36 GMT+0800
> new Date(1583487746680);
ISODate("2020-03-06T09:42:26.680Z")
> new Date(ISODate("2020-03-06T09:42:26.680Z"));
ISODate("2020-03-06T09:42:26.680Z")
> Date(ISODate("2020-03-06T09:42:26.680Z"));
Fri Mar 06 2020 17:46:10 GMT+0800
>


> use tests;
switched to db tests
> db.tb1.insert({mydate: ISODate("20121102 07:58:51")})
WriteResult({ "nInserted" : 1 })
> db.tb1.find()
{ "_id" : ObjectId("5e60d07a31a7cf46e9defe57"), "mydate" : ISODate("2012-11-02T07:58:51Z") }
> db.tb1.insert({mydate: ISODate("20191101 07:58:51")})
WriteResult({ "nInserted" : 1 })
> db.tb1.find();
{ "_id" : ObjectId("5e60d07a31a7cf46e9defe57"), "mydate" : ISODate("2012-11-02T07:58:51Z") }
{ "_id" : ObjectId("5e60d0c231a7cf46e9defe58"), "mydate" : ISODate("2019-11-01T07:58:51Z") }
> ISODate("2012-11-02T07:58:51Z").valueOf()
1351843131000
> db.tb1.find({mydate: { $gt: new Date(1351843131000) }});
{ "_id" : ObjectId("5e60d0c231a7cf46e9defe58"), "mydate" : ISODate("2019-11-01T07:58:51Z") }
> db.tb1.find({mydate: { $lt: new Date(1351843131100) }});
{ "_id" : ObjectId("5e60d07a31a7cf46e9defe57"), "mydate" : ISODate("2012-11-02T07:58:51Z") }
>

> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
tests   0.000GB
> use mock;
switched to db mock
> show collections;
db.orders.find({orderDate:{$gte:ISODate("2019-01-01"), $lt: ISODate("2019-04-01")}})

# orders表，订单表
在某个月的订单总金额怎么算？ 根据时间计算
1. dump.ter.gz文件  26.3MB
大数据分析
.tar.gz这种压缩文件，是Linux里面的压缩文件
导入mongodb中进行复杂的运算
解压文件 用于Linux中 tar -zxvf dump.tar.gz 
dump/
dump/mock/        mock db
dump/mock/orders  collection
order.metadata.json
dump/mock/order.bson  文档数据类型

bson 数据文件

进mongodb mongod —dbpath="/data/db"

2. 解压文件 tar -zxvf dump.zip
导入文件 D:\lvmeng>mongorestore -h 127.0.0.1:27017 dump  本地IP:27017端口 
要在解压的文件所在路径下执行，不然找不到文件

3. 所有的订单的总销售额：
> db.orders.findOne(); 查询orders表的其中的一条信息
status:create //创建了购物订单
it是看下一页

4. 找日期在第一季度的：
> db
    .orders
    .findOne({
        orderDate:{ //对这个字段的约束条件，因为有多条约束吗，所以用花括号
            $gte:ISODate("2019-01-01"), //
            $lt:ISODate("2020-04-01")
        }
    });
在mongodb中以$开头的就是我们的查询条件，像我们vue里面的指令一样v-if,v-for
$gte就是大于等于equal 没有e就是不能等于。

db
    .orders
    .findOne({
        orderDate:{ //对这个字段的约束条件，因为有多条约束吗，所以用花括号
            $gte:ISODate("2019-01-01"), //
            $lt:ISODate("2020-04-01")
        },
        status: 'created' //还对status进行限定，要刚下单的
    });

5. 所有订单的总金额
每一条记录的都要,大数据，mongodb很适合
db
.orders
.aggregate([ //聚合所有数据,中括号表示aggregate可以接受多个约束
    {
...    $group: { //$开头的都是指令，这按某个字段进行分组
...       _id: null, //id，不按任何字段分组 也可以_id: 'state'
...       total: { $sum: "$total"} //将分组中的total字段求和
...      }
...    }
... ])
{ "_id" : null, "total" : NumberDecimal("44019609") }
])

6. 查询2019年已完成订单的总金额和订单总数
filter过滤
上个数据的结果示下一个的输入
+ aggregate 聚合查询

$group--》group by
$match -->where

- 第一季度，已完成的订单：
> db.orders.aggregate([
... { $match:{
...   status: "completed",
...   orderDate: {
...   $gte: ISODate("2019-01-01"),
...   $lt: ISODate("2019-04-01")
... }
... }
...
... }])
- 
> db.orders.aggregate([
... {
...  $match: {
...    status: "completed",
...    orderDate:{
...     $gte: ISODate("2019-01-01"),
...     $lt: ISODate("2019-04-01")
...    }
...  }
... },
... {
...   $group:{ //分组并计算
...     _id: null, //没有要分组的字段，所以为null
...     total: { $sum: "$total"} //把分好组的total加在一起
...     ,shippingFee: { $sum: "$shipping"},
...     count: {$sum :1}, //每次都加一
...   }
... }
... ,{
...   $project: { //选择要输出哪些
...    grandTotal:{ //要输出grandTotal是这两个的和，就是第一季度所有的收入
...    $add:["$total","$shipping"]
...   },
...   count: 1, //为1，就是要输出的字段
...   _id: 0 //为0就是不输出
... }
... }
... ])

# time mongodb还有什么？
$lte $gt
SAODate 8小时时区

todo 活动 activity 分为开始日期和结束日期 time
新的模型todo.js
http://www.mongoosejs.net/docs/queries.html
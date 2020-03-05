时间处理在后台时怎么做，有什么地方是需要后台处理时间的？
数据存储比如 mongodb中

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
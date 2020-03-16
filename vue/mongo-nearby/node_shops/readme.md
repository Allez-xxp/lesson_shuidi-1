此处是后端 mongoose连接

//5G时代 机器收集数据 mongodb NOSQL
// MySql的数据表要提前设计好，字段要设计好 最好不要动，遵守三大范式构建
// mongodb更好一点，它存的是DOC文档里面存的内容是动态的
// 1. mongodb设计的时候，没设计过表，不需要，只需要把一个json save一下，就能存到collection因为没有范式的约束
//为满足5G 移动时代 mongodb出来 不需要遵守三大范式

MongoDB实现地理坐标服务(查询附近，查询距离)
https://blog.csdn.net/qq_36957587/article/details/82886960

删除某条记录
 db.shops.deleteOne({_id: ObjectId("5e6f5361facbd927006846c1")});
 查看所有的索引
 > db.shops.getIndexes();
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "meituan.shops"
        },
        {
                "v" : 2,
                "key" : {
                        "location" : "2d"
                },
                "name" : "location_2d",
                "ns" : "meituan.shops",
                "sparse" : true, //好多个 分散的
                "background" : true
        }
]

# 很多条数据 mongodb的insertMany createIndex()的创建联合索引
> use tests;
switched to db tests
> show collections;
tb1
> db.inventory.insertMany([ {"item": "f1", type:"food", quantity: 500}, {"item": "f2", type:"food", quantity: 100}, {"item": "p1", type:"paper", quantity: 200}, {"item": "p2", type:"paper", quantity: 150}, {"item": "f3", type:"food", quantity: 300}, {"item": "t1", type:"toys", quantity: 500}, {"item": "a1", type:"apparel", quantity: 250}, {"item": "t2", type:"toys", quantity: 50}, {"item": "f4", type:"food", quantity: 75} ]);
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5e6f713c84abb69d412b0f71"),
                ObjectId("5e6f713c84abb69d412b0f72"),
                ObjectId("5e6f713c84abb69d412b0f73"),
                ObjectId("5e6f713c84abb69d412b0f74"),
                ObjectId("5e6f713c84abb69d412b0f75"),
                ObjectId("5e6f713c84abb69d412b0f76"),
                ObjectId("5e6f713c84abb69d412b0f77"),
                ObjectId("5e6f713c84abb69d412b0f78"),
                ObjectId("5e6f713c84abb69d412b0f79")
        ]
}
如果有上千万条数据
mysql 几千万条，
千万条  mongodb
查询 查询得更快些 性能优化
查询需求
type  quantity

> db.inventory.find(
... { quantity: {
...     $gte: 100,
...     $lte: 200
...    }
... });
{ "_id" : ObjectId("5e6f713c84abb69d412b0f72"), "item" : "f2", "type" : "food", "quantity" : 100 }
{ "_id" : ObjectId("5e6f713c84abb69d412b0f73"), "item" : "p1", "type" : "paper", "quantity" : 200 }
{ "_id" : ObjectId("5e6f713c84abb69d412b0f74"), "item" : "p2", "type" : "paper", "quantity" : 150 }

> db.inventory.find( { quantity: {     $gte: 100,     $lte: 200    } }).explain("executionStats")
"executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 3, //找到并返回了三条
                "executionTimeMillis" : 0,
                "totalKeysExamined" : 0,
                "totalDocsExamined" : 9, //一共找了九条
                "executionStages" : {
                        "stage" : "COLLSCAN", //整个表
                        "filter" : {
建一个索引：
> db.inventory.createIndex({quantity:1});
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
> db.inventory.getIndexes({});
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "tests.inventory"
        },
        {
                "v" : 2,
                "key" : {
                        "quantity" : 1
                },
                "name" : "quantity_1",
                "ns" : "tests.inventory"
        }
]
建立了索引后explain：
> db.inventory.find( { quantity: {     $gte: 100,     $lte: 200    } }).explain("executionStats")
 "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 3,
                "executionTimeMillis" : 3,
                "totalKeysExamined" : 3,
                "totalDocsExamined" : 3,
                "executionStages" : {
                        "stage" : "FETCH",
                        "nReturned" : 3,
有查询需求就建索引。

在数据库和node中间，有index（索引）存在 
需求：
type + quantity 一起来查找 
创建联合索引：
//添加一个索引，为1,做一个升序的索引
> db.inventory.createIndex({ quantity: 1, type: 1});
> db.inventory.find( { quantity: {     $gte: 100,     $lte: 300    },type:"food" });
{ "_id" : ObjectId("5e6f713c84abb69d412b0f72"), "item" : "f2", "type" : "food", "quantity" : 100 }
{ "_id" : ObjectId("5e6f713c84abb69d412b0f75"), "item" : "f3", "type" : "food", "quantity" : 300 }
>> db.inventory.getIndexes({});
"key" : {
        "quantity" : 1,
        "type" : 1
        },
> db.inventory.find( { quantity: {     $gte: 100,     $lte: 300    },type:"food" }).explain('executionStats');    //注意里面是单引号
 "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 0,
                "totalKeysExamined" : 5, //注意这里是5
                "totalDocsExamined" : 5, //注意这里是5
反向建一个索引：
> db.inventory.createIndex(
... {type: 1,quantity: 1});
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 3,
        "numIndexesAfter" : 4,
        "ok" : 1
}
但是发现：
 "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 3,
                "totalKeysExamined" : 2, //为2
                "totalDocsExamined" : 2, //为2
                "executionStages" : {
为什么？加两个索引，反面再来一下，检索的更快。
{
                "v" : 2,
                "key" : {
                        "quantity" : 1,
                        "type" : 1
                },
                "name" : "quantity_1_type_1",
                "ns" : "tests.inventory"
        },
        {
                "v" : 2,
                "key" : {
                        "type" : 1,
                        "quantity" : 1
                },
                "name" : "type_1_quantity_1",
                "ns" : "tests.inventory"
        }
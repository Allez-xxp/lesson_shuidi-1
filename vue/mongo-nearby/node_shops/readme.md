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
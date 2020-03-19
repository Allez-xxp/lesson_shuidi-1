如果要做全文检索怎么做？
vue search组件 element ui: input + icon=search
如何支持全文检索？
mongodb自己支持全文搜索
mysql中的like也可以解决检索问题
elastic_search

> use blog
switched to db blog
> db.posts.insert({title:"I love javascript"});
WriteResult({ "nInserted" : 1 })
>  db.posts.insert({title:"I love php"});
WriteResult({ "nInserted" : 1 })
> db.posts.insert({title:"I love java"});
WriteResult({ "nInserted" : 1 })
> db.posts.insert({title:"I love go"});
WriteResult({ "nInserted" : 1 })
> db.posts.insert({title:"I love c++"});
WriteResult({ "nInserted" : 1 })
> db.posts.find({title:"love"}); //现在这样搜是没有东西的，因为这里的查询是===查询

构建一个索引，用ensureIndex 给标题字段添加一个索引，添加一个文本索引，就会把标题里面的内容索引化
> db.posts.ensureIndex({"title":"text"});
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
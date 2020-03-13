# partOne
1. 数据流通
数据绑定 -》 数据流
vuex
- mongodb -> api -> vuex -> component
组件数据流通
- 设计一个应用场景，带着vuex的设计思考，mongodb的索引
node-user 
 npm init -y 
 yarn add express mongoose

 - 数据流源头在mongodb中，使用Express跟数据库服务器通信
 App.vue

// vuex之后，组件做不了主了，因为是数据驱动页面template
//不利于数据的管理，就不在页面上直接传数据了，请了财务
// 开发分为两部分，UI用户界面工程师（前端）组件开发功能 地方；数据流管理，也就是vuex 中央
// 地方申请数据，中央发放数据
// vuex是组件之间共享数据统一管理
// 有了vuex之后，data中基本不用，用来写自己的东西，不写共享的数据，共享的写在computed
// 使用computed申请中央数据
// data里的数据是由自己决定的，私有的

store/index.js

Vuex文档https://vuex.vuejs.org/zh/guide/

store中的state有两种获取方式
1. this.$store.state.
2. 需要计算一下的话用
mapGetters方法，可以对state进行读操作
npm换了源
https://blog.csdn.net/qq_43227958/article/details/93192069
https://www.cnblogs.com/cythia/p/10985080.html
设置npm为淘宝镜像
npm config set registry http://registry.npm.taobao.org/
还原
npm config set registry https://registry.npmjs.org/
PS D:\LESSION_SHUIDI\vue\vuex-mongo-user> npm login
Username: (linanhu)
Password: (<default hidden>)
Email: (this IS public) (1919412022@qq.com)
Logged in as linanhu on http://registry.npm.taobao.org/.

node-user->api->store(状态管理)->components
api中，可能多个组件共享同一个数据状态所以需要有一个store,z进行状态管理

# partTwo
mongodb
https://www.runoob.com/mongodb/mongodb-connections.html
关于{ useNewUrlParser: true, useUnifiedTopology: true }
https://blog.csdn.net/WU5229485/article/details/100737164
mongoose
https://itbilu.com/nodejs/npm/B1FfBss6X.html

.exec((err,concats)=>{})
 mongoose 的所有查询操作返回的结果都是 query （官方文档是这样写的），并非一个完整的promise。而加上.exec()则将会返回成为一个完整的 promise 对象，但是其是 mongoose 自行封装的 promise ，与 ES6 标准的 promise 是有所出入的（你应该会在控制台看到相关的警告），而且官方也明确指出，在未来的版本将会废除自行封装的promise，改为 ES6 标准，因此建议楼主在使用过程中替换为 ES6 的 promise。
 exec和then的参数是有所不同的，前者是 callback(err,doc)，后者则是 resolved(doc),rejected(err)

数据库
> db.users.insert({"tags" : [ "music", "cricket", "blogs" ], "address" : { "city" : "Los Angeles", "state" : "California", "pincode" : "123" }, "name" : "Tom Benzamin"});
WriteResult({ "nInserted" : 1 })
> db.users.insert({"address" : { "city" : "赣州", "state" : "江西", "pincode" : "341000" }, "tags" : [ "financial", "coding" ], "name" : "严谨"});;;
WriteResult({ "nInserted" : 1 })
> db.users.insert({"address" : { "city" : "南昌", "state" : "江西", "pincode" : "330000" }, "tags" : [ "poem", "coding" ], "name" : "喻顺武"});
WriteResult({ "nInserted" : 1 })

> db.users.find({});
{ "_id" : ObjectId("5e6a50f069831de99b0519b2"), "tags" : [ "music", "cricket", "blogs" ], "address" : { "city" : "Los Angeles", "state" : "California", "pincode" : "123" }, "name" : "Tom Benzamin" }
{ "_id" : ObjectId("5e6a514669831de99b0519b3"), "address" : { "city" : "赣州", "state" : "江西", "pincode" : "341000" }, "tags" : [ "financial", "coding" ], "name" : "严谨" }
{ "_id" : ObjectId("5e6a517069831de99b0519b4"), "address" : { "city" : "南昌", "state" : "江西", "pincode" : "330000" }, "tags" : [ "poem", "coding" ], "name" : "喻顺武" }
>

跨域问题，参考ele-admin
wx: true, //??
关于fetch.then https://www.cnblogs.com/hanguidong/p/9497922.html
routes/index.js
api/index yarn serve看是否跨域成功
App.vue
store/index

api/index fetchUsersByTag(tag, cb) 后再按上层走routes/index

来到routes/index

# mongodb
> db.users.find({});                                                                                          { "_id" : ObjectId("5e6a50f069831de99b0519b2"), "tags" : [ "music", "cricket", "blogs" ], "address" : { "city" : "Los Angeles", "state" : "California", "pincode" : "123" }, "name" : "Tom Benzamin" }                                          { "_id" : ObjectId("5e6a514669831de99b0519b3"), "address" : { "city" : "赣州", "state" : "江西", "pincode" : "341000" }, "tags" : [ "financial", "coding" ], "name" : "严谨" }                                                                  { "_id" : ObjectId("5e6a517069831de99b0519b4"), "address" : { "city" : "南昌", "state" : "江西", "pincode" : "330000" }, "tags" : [ "poem", "coding" ], "name" : "喻顺武" }                                   

> db.users.find({tags: 'coding'});                                                                                      { "_id" : ObjectId("5e6a514669831de99b0519b3"), "address" : { "city" : "赣州", "state" : "江西", "pincode" : "341000" }, "tags" : [ "financial", "coding" ], "name" : "严谨" }                                                                  { "_id" : ObjectId("5e6a517069831de99b0519b4"), "address" : { "city" : "南昌", "state" : "江西", "pincode" : "330000" }, "tags" : [ "poem", "coding" ], "name" : "喻顺武" }   

优化查询性能：
分析查询：执行的状态分析
db.users.find({tags: 'coding'}).explain("executionStats);
 "tags" : {
           "$eq" : "coding"  数组中只要有一项相等就可以
          }
 "winningPlan" : {
                    "stage" : "COLLSCAN",   //表示collectionScan检索整个集合
                    "filter" : {
                            "tags" : {
                                    "$eq" : "coding"
                            }
                    },
                    "direction" : "forward"
            },
"executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 0,
                "totalKeysExamined" : 0, //当前没有利用上任何索引
                "totalDocsExamined" : 3, //总共查询了4条

查询的效率，不仅只是把Users查出来，还要能按喜好，把用户查出来，，如果这个变成了主要查询，那就要考虑加索引。添加explain看看它的执行效率高不高。
检索了整个表，查询就会很慢，为主要查询的，建一个索引
为tags集合建一个索引：
vuex 有mutation action
createIndex
db.users.ensureIndex({"tags":1) 添加一个索引，为1,做一个升序的索引

> db.users.ensureIndex({"tags":1});
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

> db.users.find({tags: 'coding'}).explain("executionStats);
"winningPlan" : {
                    "stage" : "FETCH",
                    "inputStage" : {
                            "stage" : "IXSCAN", //变成了这个
 },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 2, 
                "totalKeysExamined" : 2, //用了索引了
                "totalDocsExamined" : 2, //现在只会检查两个文档
//查看所有的索引   
> db.users.getIndexSpecs();
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1  //默认一定会有一个_id的自增索引
                },
                "name" : "_id_",
                "ns" : "test.users"
        },
        {
                "v" : 2,
                "key" : {
                        "tags" : 1 //这个是我们建的 ，升序
                },
                "name" : "tags_1", //名字，删除的时候用
                "ns" : "test.users"
        }
]
//删除索引
> db.users.dropIndex("tags_1");
{ "nIndexesWas" : 2, "ok" : 1 }

//落实到node中
vuex-mongodb-user的models中（设计模型的时候）
"tags": [
        { type: String,index: true}
    ],

PS D:\LESSION_SHUIDI\vue\vuex-mongo-user\node-user> nodemon app.js运行node项目后
只要一保存，就会加上索引
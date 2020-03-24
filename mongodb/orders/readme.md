1. mongodb 跟mysql的本质区别：
- sql 关系型数据库 三大范式
- noSql y允许一定的存储冗余

user_id name orders
1. 展示订单 分页 element-ui(pc端用) PC后台 运营部门 老板 看的 
关心的是总数 每季度的订单 最佳单品。。。
2. 对用户来说 最多的查询是什么 查询量更大
price -/. products 推荐 
orders 我的订单 听过uesr_id查询 不需要关联user表 ，做了冗余

- 总销量
total
orders表 orderLines orders表里面专门有一个total字段，为了便于查询，便于用户查询
total->order _id(每个商品都有一个total，以_id为关键字)

db.orders
聚合aggregate([ //中括号是说明有很多步

> db.orders.aggregate([
... {
...   $group: {
...      _id: null, //不按id分组，所有信息都要
...      total: {
...           $sum: "$total"  //对分组中每一个字段加法计算
...      }
...    }
... }]);
{ "_id" : null, "total" : NumberDecimal("44019609") }

- 计算第一季度，每个州销量最多的sku的第一名 
  - 第一季度  关联的字段：orderDate ISODate()  用$lt $gt 找出季度
  - 每个州    关联的字段：$state  是分组的依据，以州统计销量最多 $group  state
  - 销量最多  关联的字段：orderLines有sku和 quality  orderLines.sku 进行分组$group,分完组后是对数量求和$sum  orderLines.qty
  - sku(商品的号码)   排序 按照州排序 降序 orderby
  上一次查询的结果是下一次查询的输入，这是一个aggregate的应用场景
  分组同时按照州、sku一起分组。

  $match: {} //相当于where  条件放进去
  status: "completed", //有效订单，传入


> db.orders.aggregate([
... {
...     $match: {
...         status: "completed",
...         orderDate: {
...              $gte: ISODate("2019-01-01"),
...              $lt: ISODate("2019-04-01")
...              }
...      }
... }
... ]);

state + sku 分组
每个订单中
$unwind:  展开 将orderLines展开
"$"某一个字段

> db.orders.aggregate([ {     $match: {         status: "completed",         orderDate: {               $gte: ISODate("2019-01-01"),              $lt: ISODate("2019-04-01")              }      } } ,{
... $unwind:"$orderLines" //展开 才能对每个州的每个sku进行分组
... }]);

$group: {
...        _id://根据哪几个字段分组

> db.orders.aggregate([ {     $match: {         status: "completed",         orderDate: {               $gte: ISODate("2019-01-01"),              $lt: ISODate("2019-04-01")              }      } } ,{ $unwind:"$orderLines" },
... {
...     $group: {
...        _id: {
...               state: "$state",
...               sku: "$orderLines.sku"
...        },
...       count: {
...               $sum: "$orderLines.qty"
...              }
...      }
...  }
... ]);
{ "_id" : { "state" : "Hawaii", "sku" : "orderLines.sku" }, "count" : 45817 }
{ "_id" : { "state" : "Washington", "sku" : "orderLines.sku" }, "count" : 50357 }
{ "_id" : { "state" : "West Virginia", "sku" : "orderLines.sku" }, "count" : 46399 }
...
Type "it" for more
$group 分组  _id 根据什么字段分组  $total $

> db.orders.aggregate([ {     $match: {         status: "completed",         orderDate: {               $gte: ISODate("2019-01-01"),              $lt: ISODate("2019-04-01")              }      } } ,{ $unwind:"$orderLines" }, {     $group: {        _id: {               state: "$state",               sku: "orderLines.sku"        },       count: {               $sum: "$orderLines.qty"              }      }  },
... {
...    $sort: {
...        "_id.state":1,
...         "count": -1
...    }
... }
... ]);


> db.orders.aggregate([ {     $match: {         status: "completed",         orderDate: {               $gte: ISODate("2019-01-01"),              $lt: ISODate("2019-04-01")              }      } } ,{ $unwind:"$orderLines" }, {     $group: {        _id: {               state: "$state",               sku: "$orderLines.sku"        },       count: {               $sum: "$orderLines.qty"              }      }  }, {    $sort: {        "_id.state":1,         "count":-1    } } ,
... {
...    $group:
...           {
...             _id: "$_id.state", //上一个输出的state 按州分组
...             sku: {  //生成新的sku
...                    $first:"$_id.sku"  //拿出排在第一个的sku中的sku(上一个输出中有)
...           },
...             count:{  //马上进行计算州的sku
...                 $first: "$count"  //第一条数据的 ，把上一条记录中的count拿来
...             }
...          }
... }
... ]);
{ "_id" : "Kentucky", "sku" : "orderLines.sku", "count" : 56124 }
{ "_id" : "Louisiana", "sku" : "orderLines.sku", "count" : 47248 }

db.orders.aggregate([ {     $match: {        status: "completed",        orderDate: {           $gte: ISODate("2019-01-01"),           $lt: ISODate("2019-04-01")        }     } } ,{ $unwind: "$orderLines" }, {   $group:{     _id:{       state:"$state",       sku:"$orderLines.sku"     },   count:{     $sum:"$orderLines.qty"   } } }, {   $sort: {     "_id.state" : 1, "count" : -1 } },{    $group:       {       _id: "$_id.state",       sku: {           $first: "$_id.sku"      },      count: {         $first: "$count"      } } }] )  ;
作业，   统计  SKU 销量件数     统计每个sku再第一季度销量的次数     不算取消状态的订单，   按销售数量降序排序
1. 
> db.orders.aggregate([
...  {
...      $match:{
...           status: "completed",
...           orderDate:{
...               $gte: ISODate("2019-01-01"),
...               $lt: ISODate("2019-04-01")
...              }
...        }
... }
... ]);

2. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } ,
... {
...   $unwind:"$orderLines"
... }
... ]);
3. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } , {    $unwind:"$orderLines" } ,
... {
...    $group: {
...       _id: {
...              sku: "$orderLines.sku"
...       },
...    count: {
...             $sum: "$orderLines.qty"
...            }
...    }
... }
... ]);
4. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } , {    $unwind:"$orderLines" } , {     $group: {       _id: {              sku: "$orderLines.sku"       },    count: {             $sum: "$orderLines.qty"            }    } } ,
... {
...   $sort: {
...           "count":-1
...          }
... }
... ]);
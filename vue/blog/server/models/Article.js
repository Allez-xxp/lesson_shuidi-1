// 建表 collection
// 1. Schema  表设计
// 2. 模型对象 返回 
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  uid:{  //文章跟用户之间的一个外联关系
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
},
  title: { type: String },
  isTop: { type: Boolean}, //是否置顶
  summary: { type: String }, // 列表里的介绍
  body: { type: String },
  categories:[{ type: mongoose.SchemaTypes.ObjectId, ref:'Category'}]
})

//数据库里的类：Article；表名：articles，有很多篇articles
module.exports = mongoose.model('Article', schema, 'articles');
// 
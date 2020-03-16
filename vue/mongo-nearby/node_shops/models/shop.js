const mongoose = require('mongoose')

// 5G时代， 机器收集的， 数据 mongodb 
// 比mysql 更优秀， 
// mysql 数据表提前设计好， 字段， 数据库三大范式
// mongodb doc 文档 存储的内容是动态的， 
// 1. 没有创建表？  {} => save 存到collection
// NOSQL   SQL 语句的语法
//   移动时代， 5GAI时代

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 必填
    // index: true
  },
  location: { //location base service
    type: [Number],  //经纬度 [111,90]
    index: '2d',  //作用：2d索引 location会将type和index组成一个平面，快速的将数据库中的经纬度计算
    sparse: true //索引的另一个声明 满足散落在各个地方的
}
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;
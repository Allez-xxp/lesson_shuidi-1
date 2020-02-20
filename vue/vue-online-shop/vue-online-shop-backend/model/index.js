// 电商网站设计，模型层 mongoose
// 要设计products表，有很多商品（复数） 商品 collection
// 商品来自小米   商家表-》 collection表 mi-products（表） mi商家 manufacturer 厂家
// 1. Schema ?只是一个草图，一个设计， 设计数据库。将数据库通过schema构建起来 在mongodb中用schema，再new一下schema,再save就能把数据存进数据库
// new Schema   save 存好数据
// mongodb的驱动
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//从mongoose里面拿出schema，设计一个schema

//绑定当前mongoose
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

//第一表  products 商品表
// 从设计数据库开始 数据库模型设计
const productSchema = Schema({
  id: ObjectId,//唯一 在mongodb中的属性 mongodb的id叫做ObjectId是一个hash字符串； mysql 自增的
  name: String, //商品名
  image: String,
  price: Number, /*10000 9999*/
  description: String, /*1亿相素 */
  //mongodb非关系型数据库 NOSQL,没有名义上的外键关系，但是也能做关联，只需添加ref
  manufacturer: { type: ObjectId, ref: 'Manufacturer' } //两个表的关系的表现，外键关联
})
//厂家和商品在 mysql 关系型数据库是什么关系？ 一对多 一个商家有多个商品
//第二个表manufacturer 
const manufacturerSchema = Schema({
  id: ObjectId,
  name: String
})
// 2. 生成模型类映射数据库表 
// 这里面才是等下要去new的，new了之后save就能保存数据
const Product = model('Product', productSchema); //第一参数是模型类取的表名
const Manufacturer = model('Manufacturer', manufacturerSchema);

// 生成模型类后要向外输出。
module.exports = {
  Product,
  Manufacturer
}

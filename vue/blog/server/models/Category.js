// blog分类的Schema
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title:{ type:String }
})

// model -> mongodb 存储到底做了什么事情? 只需知道mongoose作数据驱动有两件事：schema和model
module.exports = mongoose.model('Category',schema,'categories')
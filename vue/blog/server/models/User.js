// blog分类的Schema
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type:String },
    password:{
        type:String,
        // 希望获取用户数据的时候， 不要把密码取出去
        select: false, // select属性，做select查询的时候，这个字段不查询出去。只有设置也就是update和insert的需要，没有select的需要。 
        set(val) { // insert 操作时传进来的密码 123456，会在数据库层进行hash操作
        // bcrypts是个库，这个npm包会帮助我们 123456 -> dfadlfjdslafjdasjlvlcxvjxlkj
        // hashSync这个api就是从123456到dfadlfjdslafjdasjlvlcxvjxlkj的过程
        return bcrypt.hashSync(val, 10) // 不会存明文密码 是同步的，10是一个参数
        }
    },
    //一个用户有多篇文章，那么用户和文章的关系怎么表达？ 在Article.js
})

// model -> mongodb 存储到底做了什么事情? 只需知道mongoose作数据驱动有两件事：schema和model
module.exports = mongoose.model('User',schema,'users')
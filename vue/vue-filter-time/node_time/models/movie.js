const mongoose = require('mongoose');

//数据库存放在我们的硬盘中，这时候是一个物理模型，在物理模型之前的是模型（逻辑模型
const movieSchema  = mongoose.Schema({
    title:{
        type:String,
        requierd:true
    },
    poster: String, //封面 以url形式 比较大
    rating: String, //比分
    introduction: String, //介绍
    //大多数表的时间类型的声明
    created_at: { //创建的时间
        type: Date, //模型类型校验
        default:Date.now //默认是当前时间，这样就不用传了，调用mongoodb的Date.now函数
    },
    update_at:{ //更新时间
        type: Date,
        default: Date.now
    }
})
//向外输出
const Movie = mongoose.model('Movie',movieSchema);//Movie这样就有我们的模型类了，这个模型类再用save方法就能通过mongoose保存
module.exports = Movie //模型对象
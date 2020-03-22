// 数据库层分离 向外提供
module.exports = app =>{
    //mongoose是mongodb的驱动
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/27017/myblog',{
        useNewUrlParser:true //是一个选项，兼容mongodb这个url的一个新的机制
    }) //发起数据库的连接
    
}
//希望外部传入整个app应用
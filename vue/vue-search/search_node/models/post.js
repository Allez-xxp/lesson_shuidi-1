const mongoose = require('mongoose');

const schema = mongoose.Schema;
const postSchema = new schema({
    title:{
        type: String,
        index: "text"  //添加一个文本索引
    }
})
const Post = mongoose.model('Post',postSchema);
module.exports = Post;
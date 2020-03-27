const elasticsearch = require('elasticsearch');  //等同于数据库，跑在mongodb之前
const users = require('./users.json');
const client = new elasticsearch.Client({   //实例化一个，用它
    hosts: ['http://localhost:9200']  //天生是分布式的,进行分布式检索
})
client.ping({
    requestTimeout: 30000,
},function(error) {
    if(error) {
        console.error('error!!');        
    } else {
        console.log('success!');
    }
})

//要有索引  相当于mongodb的一个表
//建表只能建一次 来到kibana
// client.indices.create({ 
//     index: "tutorial"  //索引的名字
// }, function(error, response, status) {
//     if(error) {
//         console.log('error!!');        
//     } else {
//         console.log('create a new index', response);
//     }
// })
// client.indices.create({
//     index: "juejin",
// }, function(error, response, status) {
//     if(error) {
//         console.log('error！');
//     } else {
//         console.log('created!', response);
//     }
// })
//GET _cat/indices

//放数据进去索引表
var bulk = []; //一个索引拥有的数据就叫一个bulk,是一个单位,bulk下面是doc
users.forEach(user => {
    bulk.push({index:{  //为原始数据添加索引
                _index:"juejin", //名字叫
                _type: "users_list" //索引类型，对用户的列表进行查询
        }
    })
    bulk.push(user);
});
//块已经成为了一个整体的数组，现在正式的添加，通过body放到连接的那台elasticsearch服务器中
client.bulk({body:bulk},function(err, response) {
    if(err) {
        console.log("failed bulk operation".red,err)
    } else {
        console.log(response)
    }
})
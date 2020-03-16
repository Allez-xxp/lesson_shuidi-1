const express = require('express');
const shop = express.Router();
const db = require('../db/db.js');
const Shop = require('../models/shop.js');

// 2d spare 是mongodb 内建的， 独有的功能
// 1. NOSQL 
// 2. 移动时代， 定位功能
shop.get('/', async(req, res) => {
  Shop
    .find({
      location: { 
        $near: [28.6873380300,115.8340632900], // 地址反查 偏差100m国家安全问题 $ 在mongodb 里表示某个指令 函数
        $maxDistance: 0.2 //2公里之内的  10公里 1 index 距离排序 
        // $lt $  
      } // mongodb 20 
    }).limit(5).exec(function(err, shops) {
      if (err) {
        console.log(err)
      }
      res.json(shops)
    })
})

shop.post('/', async(req, res) => {
  console.log('---shops');
  // const gqmx = new Shop({ //将模型文件实例化一下
  //   name: '正宗过桥米线(优乐汇店)',
  //   location: [115.83273,28.717934]
  // });
 
  // gqmx
  //   .save((err, saved)=> {
  //     res.json({
  //       status:1
  //     })
  //   })

  const xhg = new Shop({ //将模型文件实例化一下
    name: '古乐牛香火锅',
    location: [28.6873380300,115.8340632900]
  });
  xhg
    .save((err, saved)=> {
      res.json({
        status:1
      })
    })
});

module.exports =  (app) => {
  app.use('/shops', shop);
}

// const express = require('express');
// const shop = express.router();
// const db = require('../db/db.js');
// const Shop = require('../models/shop.js');

// shop.get('/',async(req,res)=>{
//   Shop
//     .find({
//       location : {
//         $near: [345,346],
//         $maxDistance: 0.2
//       }
//     }).limit(10).exec(function(err, shops){
//       if(err){
//         console.log(err);
//       }
//       res.json(shops);
//     })
// })

// shop.post('/', async(req,res)=>{
//   const gqmi = new Shop({
//     name: '云南过桥米线',
//     location: [333,333]
//   });
//   gqmx
//    .save((err,saved)=>{
//      res.json({
//        status:1,
//        message: '保存成功'
//      })
//    })
// });
// module.exports = (app) => {
//   app.use('/shops', shop)
// }
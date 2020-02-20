// control层负责打理模型，能控制模型层
const Model = require('../model');//mvc,负责control层存数据，取数据。。。
// 控制器可以向模型层写入数据的
const { Manufacturer, Product } = Model; //将模型层解构出来-》模型对象

const manufacturerController = {//要记得向外输出类名 
  all (req, res) { //从api的来找all方法，get方法请求所有的商家
    res.json({
      manufacturers: [] //对应的表名是小写复数 mongoose 干的，之前定义的是Manufacturer
    })
  },
  //创建一家公司
  create(req, res) {
    const requestBody = req.body; //req请求体， 拿到发送过去的表单
    // {name: '小米', } object mapping ORM
    // console.log(requestBody, '++++');
    const newManufacturer = new Manufacturer(requestBody) 
    //底层怎么存的， 不用管 mongoose帮你忙
    newManufacturer.save((err, saved) => {
      res.json({
        mes: 'ok' //添加路由后记得要重启再看效果
      })
    })
  }
}

//向外输出
module.exports = manufacturerController;
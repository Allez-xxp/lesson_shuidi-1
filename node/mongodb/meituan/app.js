const express = require ('express'); //node的开发框架

const path=require('path');
const bodyParser=require('body-parser');//例行公式，解析表单内容，会有npm包npm i body-parser

// const url=''
// 连数据库 mongodb是非关系型数据库
const MongoClient=require('mongodb').MongoClient;
const ObjectID=require('mongodb').ObjectID;
// 局域网内老师的id
const url='mongodb://192.168.31.129:27017/meituan';

let dbo;

const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');//ejs模板引擎 要安装模板引擎npm i ejs
app.use(bodyParser.urlencoded(
    {
        extended:false
    }
));
//app.use(bodyParser.json({})) 作为黑盒子代码
app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json({}))

// 测试数据库是否连接成功
MongoClient.connect(url,{
    useNewUrlParser:true
},function(err,db){
    if(err){
        console.err(err);
    }
    dbo=db;//连接成功，把db的句柄给dbo
    console.log('数据库连接成功！');
})

app.get('/', function(req,res){
    res.send({
        code: 0,
        message: 'hello world'
    })
})
// 做数据库，为保存做准备

app.get('/restaurant/:restaurant_id',(req,res)=>{
    let restaurant_id=req.params.restaurant_id
    let dbObject=dbo.db("meituan");
    dbObject
        .collection("restaurant")//找到表
        .find({
            _id:ObjectID(restaurant_id)
        })
        .toArray((err,result)=>{
        //   res.send({
        //   msg:'ok',
        //   data: result[0]  
        // })
        // 渲染index模板
        res.render('index',{
            restaurant:result[0]
        })//显示到界面上
    
    })

})
app.post('/restaurant',(req,res) =>{
    console.log(req.body);
    let dbObject=dbo.db("meituan");
    dbObject
    .collection("restaurant")//相当于表单，这里是用集合
    .insertOne(req.body,(res,result)=>
    {
        //提交了什么，insert什么
        console.log(result,insertedId);
    })
    
    //拿表单内容 是req请求体 req.body
    res.send({
        code:0,
        data:req.body
    })
})
app.listen(7001);
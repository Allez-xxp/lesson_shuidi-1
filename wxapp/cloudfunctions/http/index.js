// 云函数入口文件
// 云sdk
// const cloud = require('wx-server-sdk')
// const got = require('got')//页面要引入got
// // 初始化云
// cloud.init()

// // 云函数入口函数  向外输出一个叫main的函数，
// // asyc是异步 asyc函数前面的修饰符，放在函数前面，表示是一个异步函数；await需要等等
// // event出事了 小程序客户端 callFunction event代表小程序 context是上下文
// exports.main = async (event, context) => {
//   // const wxContext = cloud.getWXContext()//拿到微信的上下文环境

//   // return {
//   //   event,//打印出整个对象
//   //   openid: wxContext.OPENID,
//   //   appid: wxContext.APPID,
//   //   unionid: wxContext.UNIONID,
//   // }//return给了云，里面的都是小程序的id

//   // got要安装的，他是一个库
//   let getResponse=await got('httpbin.org/get')
//   // console.log(getResponse,'++++++++++++++++++++');
//   // return JSON.parse(getResponse)
//   let postResponse=await got('httpbin.org/post',{
//     method:'POST',//加密的请求 postman
//     headers{
//       'Content-Type':'application/json'
//     },
//     body:JSON.stringify({
//       title:'这是标题',
//       value:123
//     })
//   })
//   // return {
//   //   url:getResponse.url
//   // }
//   return postResponse.body
  
// }
// 注意：package.json里面不可以写备注

// 云函数入口文件
// 云sdk
const cloud = require('wx-server-sdk')
const got = require('got')
// 初始化
cloud.init()

// 云函数入口函数
// async 表示异步 await
// event 出事 小程序客户端 callFunction event代表小程序
// context 上下文
exports.main = async (event, context) => {
  let getResponse = await got('httpbin.org/get')
  // console.log(getResponse);
  let postResponse = await got('httpbin.org/post',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title: '这是标题',
      value: 123
    })

  })
  return postResponse.body
}
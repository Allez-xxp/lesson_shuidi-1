// Page是一个函数
Page({
  http(){
    //http方法，要去另外的网站拿数据
    // 上云吧：云计算很强，有了云就是构建了前端后端合作的桥梁
    // wx上云端
    wx.cloud.callFunction({
      name:"http"//从本地跳到云
    })
    //因为需要花点时间。 从云下来：.then()
    // res 箭头函数 返回结果
    .then( res =>{
      console.log(res);
    })
  }
})
// 记得新建云函数http
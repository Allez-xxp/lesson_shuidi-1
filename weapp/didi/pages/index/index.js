const app=getApp();//拿到全局的应用

Page({
  data:{
    // 高亮
    currentTab:3,
    navScrollLeft:0,
    navData:[
      {
        id:1,
        name:'专车'
      },
      {
        id:2,
        name:'快车'
      }
    ]
  },
  showUser(){
    console.log(app);
    // 用户是否登陆？去登陆

    wx.navigateTo({
      url:"/pages/login/login"
    })
  },
  onLoad(){
    //请求数据
    // console.log('ddd');
    // wx.request({
    //   url:""
    // })
    wx.request({
      url:'http://localhost:1314/indexPage',
      success:(res)=>{
        // console.log(res);
        const navData=res.data.navData;
        console.log(navData)
        this.setData({
          navData
        })
      }
      // 成功后的回调
    })
    
  },
  switchNav(e) {
    const cur = e.currentTarget.dataset.current;
    // console.log(cur);
    this.setData({
      currentTab:cur
    })
  }
})
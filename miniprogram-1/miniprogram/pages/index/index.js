Page({
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        // wx.showToast({
        //   title: JSON.stringify(res.result),
        //   duration: 10000
        // })
        let isbn=res.result;
        // isbn -> 到云里查询
        // 委派云去查API
        wx.cloud.callFunction(
          {
            name:'bookinfo',
            data:{
              isbn:isbn
            },
            success:res =>{
              console.log
              (res.result);
            }
          })
      }
    })
  }
})
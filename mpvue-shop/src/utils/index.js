function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) { //官方抛出的格式化的时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


//----------------------------请求的封装
const host="http://localhost:5757/lm" //我们这个项目要用到的url前缀都是这个，所以这里先const一下 比较方便
export {host};

//请求封装，封装接口请求一般都是封装成一个方法
// header={}请求头，要不要都行
function request(url,method,data,header={}){
  //每次请求时都会耗时的，为了提高用户体验感，我们加一个loading
  wx.showLoading({
    title:"加载中...",
  
  });
  // 把wx.request接口请求封装成promise data是要向后端接口传的参数
  // 把wx.request接口请求封装成function request这个方法，以后用直接调用
  return new Promise((resolve,reject)=>{
      wx.request({  //这样封装之后，我们要做接口请求的时候 只需要调用这个方法就行
      url:host + url,
      method:method,
      data:data,  //是要向后端接口传的参数
      header:{
        "content-type":"application/json" //默认的请求头
      },
      success(res){
        wx.hideLoading();//把之前的页面加载中隐藏掉
        resolve(res.data) //这里的data跟data:data的是不一样的，这是response返回值里的data
      },
      fail(error){
        wx.hideLoading();
        reject(false)
      },
      complete (){  //完成的话
        wx.hideLoading();
      }
    })
  })
}

//把get,post方法也封装一下（本栈全部的接口请求只用都用GET，或POST方法）
//调用request方法，也就是如果想用request做接口请求，并且method是get的时候直接调用这个get方法就行
export function get(url,data){
  return request(url,'GET',data) //调用request方法
}
export function post(url,data){
  return request(url,'POST',data) //调用request方法
}

export default {
  formatNumber,
  formatTime  //如果需要格式化时间的话，直接这里引入抛出的formatTime，然后页面中import我们这个index.js，然后把这个方法拿过去用就好了
}

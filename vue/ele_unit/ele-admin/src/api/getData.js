/**
 * API定义集合文件
 * @param {*} data 
 */

// es6的模块化
export const login = (data) =>{
    // 里面是一个要异步的
    return new Promise((resolve,reject)=>{
    //     setTimeout(()=>{
    //         resolve({
    //             status:1, //若为0是失败
    //             message:'登录成功'
    //         })
    //     })
    // },1000)
    // 我们的数据是在3000端口上的,跟后端之间通信我们以/api开始
    // fetch('http://192.168.0.105:3000/api/admin/login',{
     fetch('/api/admin/login',{ //先改一下，现在是404问题，没报跨域问题，来到后端index.js。新建vue.config.js
        method:'POST', //请求头
        body:JSON.stringify(data) //放置到请求体中
    })
    //请求完成之后.then
    .then(data =>data.json())
    .then(data => {
        resolve(data)
    })
    .catch(err => { //跨域了，原来在8080端口，现在要去3000端口
        console.log(err)
        reject(err)
      })
    })
}
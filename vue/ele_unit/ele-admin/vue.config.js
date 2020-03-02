// 最终跨域问题解决方案 ngnix
module.exports = {
    // 服务器帮我们做一个代理
    devServer: {
        // 想请求的地址：http://192.168.0.105:3000/api/admin/login，api是语义化，代表模块
        // 从http://192.168.0.105:8080/api/admin/login'-》http://192.168.0.105:3000/admin/login'
        proxy:{
            // 给一个正则，若给的地址有/api这个字符就送往一个目标
            '/api': {
                //会帮你转发到这个端口下，那就意味着对于我们的api来说就能接收了
                target : 'http://192.168.0.105:3000',
                changeOrigin:true,
                pathRewrite:{
                    //替换以/api开始的,替换为空
                    '^/api':''
                }
            }
        }
    }
}
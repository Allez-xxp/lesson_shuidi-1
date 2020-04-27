//对tag中的数据进行响应
// umi 是一个开发框架，是一个架构 约定大于一切
import { Request, Response } from 'express'; //内置了express服务
// 获取请求对象，结果返回对象
const getTags = (req: Request, res: Response) => {
    //console.log(req, res)
    res.json({
        // 返回假数据
        data:[
            {
                id:1,
                title: 'vue'
            },
            {
                id:2,
                title: 'react'
            },
            {
                id:3,
                title: 'antd'
            },
        ]
    })
    // 可以看见数据了
}

// umi 启动了json服务器，把json数据返回
// 在mock的json服务器中它内置了express
export default {
    'GET /api/tag/all': getTags //这里定义mock访问的url,前面的'GET是我们访问的方法，后面是请求的url 交给getTags函数来执行
}
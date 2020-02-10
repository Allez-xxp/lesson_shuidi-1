const { mysql} = require('../../mysql') //引入mysql.js

//抛出模块，我们这里放上异步 
module.exports=async (ctx) =>{
    //1.抛出去一个轮播图
    // mysql的查询语句，是否存在一个叫nideshop_ad的表(里面是轮播图)
    const banner = await mysql('nideshop_ad').where({
        ad_position_id:1
    }).select()
    // 找到就调用select()方法

    //拿tab类型(channel数组)
    const channel = await mysql('nideshop_channel').select() //全部都要
    
    //品牌列表
    const brandList = await mysql('nideshop_brand').select() //获取了然后输出到页面

    //往页面上输出。查询语句会把结果给banner，banner又通过'banner'字段往前端输出
    //往页面上输出。查询语句会把结果给channel，channel又通过'channel'字段往前端输出,重启后端项目看看
    ctx.body={
        'banner':banner,
        'channel':channel,
        'brandList':brandList
    }
}
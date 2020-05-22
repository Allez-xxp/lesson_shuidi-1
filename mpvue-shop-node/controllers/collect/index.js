const { mysql } = require('../../mysql')

//添加收藏
async function addCollect(ctx) { //上下文
    // 记住前面用post传过来的时候就是用request.body,依赖koa-bodyparser去解析我们的请求体
    const { openId, goodsId } = ctx.request.body 
    // 拿到前端的参数
    // console.log(openId, goodsId);
    // 添加收藏，第一件事是判断是否已经收藏
    // 我们有一张收藏表
    const isCollect = await mysql('nideshop_collect').where({
        'user_id': openId,//用户id
        'value_id': goodsId //key都是数据库的表中对应的字段，//商品id
    }).select()
    if(isCollect.length ==0) {
        // 没收藏过的，就是新增不过没必要把所有的商品信息都写进去
        await mysql('nideshop_collect').insert({
            'user_id': openId,
            "value_id": goodsId
        })
        ctx.body = {
            data: 'collected!'
        }
    } else {
        // 否则从数据库中移除这条数据
        await mysql('nideshop_collect').where({
            'user_id': openId,
            "value_id": goodsId
        }).del()
        ctx.body = {
            data: 'uncolected!'
        }
    }
    // 往页面上输出一个提示语
   
}

//模板导出，这样routes/index那里引入的controllers才能拿到addCollect这个方法
module.exports = {
    addCollect
}
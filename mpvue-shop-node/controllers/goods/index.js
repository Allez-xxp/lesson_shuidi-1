// 首先，引入mysql
const {mysql} = require('../../mysql')

//商品详情页数据
async function detailAction(ctx){
    const goodsId = ctx.query.id
    const openId = ctx.query.openId
    console.log(goodsId); //没有触发接口请求吗？
    //查询商品信息
    const info = await mysql('nideshop_goods').where({
        'id':goodsId
    }).select()
    // 商品相关的图片在另一张中，跟这张表是一个关联表，专门用来存放图片的
    const gallery = await mysql('nideshop_goods_gallery').where({
        'goods_id': goodsId //前端传过来的goodsId,跟表中的图片的id要是一样的就取出来
    })
    ctx.body = {
        'info': info,
        'gallery': gallery
    }
}

//模板抛出 把方法抛出
module.exports = {
    detailAction
}
// 首先，引入mysql
const {mysql} = require('../../mysql')

//获取商品详情页数据
async function detailAction(ctx){
    const goodsId = ctx.query.id
    const openId = ctx.query.openId
    console.log(goodsId); //没有触发接口请求吗？
    //查询商品信息
    const info = await mysql('nideshop_goods').where({
        'id':goodsId
    }).select()
    // console.log(info[0]);
    // 商品相关的图片在另一张中，跟这张表是一个关联表，专门用来存放图片的
    const gallery = await mysql('nideshop_goods_gallery').where({
        'goods_id': goodsId //前端传过来的goodsId,跟表中的图片的id要是一样的就取出来
    })
    // 取商品参数信息
    // 这张表中有所有商品的参数
    // 我们现在要日式和风懒人沙发这件商品的参数，那就需要根据某一个特殊的字段取，根据id取
    // 所以我们这张参数表也是商品表nideshop_goods的关联表，所以我们去查询这张表
    // 区分（column）当前这张表中的value:nideshop_goods_attribute.value还有一张表，nideshop_attribute也是关联表
    // nideshop_attribute对应到这张表的所有的参数信息，为什么分两张表存？参数的类型不一样分开存储有助于更好的构建后端的数据库
    // 然后使用leftjoin方法,这两张表参杂使用，关联查询两张表
    // 会匹配传过来的id和要查询的这张表中的goods_id,匹配到了就会把nideshop_goods_attribute表中的所有数据去出来，并且还会关联去取nideshop_attribute表中的attribute_id跟nideshop_goods_attribute.attribute_id相同的数据。
    const attribute = await mysql('nideshop_goods_attribute')
    .column('nideshop_goods_attribute.value', 'nideshop_attribute.name')
    .leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id','nideshop_attribute.id')
    .where({
        'nideshop_goods_attribute.goods_id': goodsId
    }).select()

    // 常见问题 然后往前端页面输出
    const issue = await mysql('nideshop_goods_issue').select()

    // 大家都在看
    const productList = await mysql('nideshop_goods').where({
        // 因为展示的物品是有点关联的
        // 再次去取数据的时候，要取跟我的categrey_id一样的（跟上次取的数据相同的数据）
        'category_id':info[0].category_id//info中有这么一个字段
    }).select()
    // 为了收藏的数据源获取是否收藏
    // 判断是否收藏过
    const isCollected = await mysql('nideshop_collect').where({
        'user_id': openId,
        "value_id": goodsId
    }).select()
    let collected = false;
    if(isCollected.length > 0) {
        collected = true;
    }
    // 然后把这个变量往外输出就行了

    // 查看购物车中有几条数据 
    // 先判断给用户的购物车中是否含有此商品，
    const oldnumber = await mysql('nideshop_cart').where({
        'user_id': openId
    }).column('number').select()
    // 区分number这个字段
    // console.log(oldnumber);
    let allnumber = 0;
    // 说明这个用户的购物车中已经添加了一些数据了，要往页面上输出具体添加了多少条数据
    // 如果点击购物车的时候，这个商品还没在购物车中，点击了会跳到购物车页面，然后默认这个商品也加到购物车中
    if(oldnumber.length > 0) {
        for(let i = 0; i < oldnumber.length; i++) {
            const element = oldnumber[i] //每一条数据//element就是{number:1}这样的
            allnumber += element.number //这里的allnumber代表的是购物车中的总量，而不是种类
        }
    }

    ctx.body = {
        // 'info': info,
        'info': info[0] || [], //以防万一，再加一个或者//现在后端输出就不再是一个数组，而是一个对象了
        'gallery': gallery,
        'attribute':attribute,
        'issue': issue,
        'productList': productList,
        'collected': collected,
        'allnumber': allnumber
    }
}

//模板抛出 把方法抛出
module.exports = {
    detailAction
}
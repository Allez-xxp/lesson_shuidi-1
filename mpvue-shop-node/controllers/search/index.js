const { mysql } =require('../../mysql')
//接口请求的准备工作
//获取搜索历史
async function indexAction(ctx){
    const openId = ctx.query.openId  //因为我们index.vue里面传参是用路由后面拼接问号传的，所以是query
    //默认关键字(有一张专门存关键字的表)
    const defaultKeyword = await mysql('nideshop_keywords').where({
        is_default:1
    }).limit(1).select()
    //热门关键字
    const hotKeywordList = await mysql('nideshop_keywords').distinct('keyword').column('keyword','is_hot').limit(10).select()
    // .distinct（不同）取出，Column分类
    //搜索历史
    const historyData = await mysql('nideshop_search_history').where({
        'user_id':openId //必须要根据openId,因为是你自己的数据就只有自己能取出来，不会看到别人的历史
    }).limit(10).select()
    //因为当前我们的接口(routes/index里的get('search/indexaction))是要做成既能取热门搜索，又能取搜索历史的，所以现在这里两个都要设置。
    ctx.body = {
        'defaultKeyword':defaultKeyword[0],
        'hotKeywordList':hotKeywordList,
        'historyData':historyData
    }
}

//添加搜索历史：只要在页面上面输入了内容并且去执行了搜索，那么输入的内容就要放到服务器，放到数据库被保存下来，以作下一次再点开搜索页面的搜索历史的展示
async function addHistoryAction(ctx){
    const { openId,keyword} = ctx.request.body //就是index.vue中searchWorlds方法里面的data数据，因为我们做接口请求传过来的参数就是被ctx.request.body拿到，然后再把拿到的两个参数解构出来
    //先取到上一次的搜索记录(是有一张表的)
    const oldData =await mysql('nideshop_search_history').where({
        'user_id': openId,//就是传过来的this.words
        'keyword': keyword
    })//如果有就去执行取出，有，就说明当前表中已经保存了这条数据了，也就是说其实我现在搜索的记录其实已经保存到数据库中了，也就是不用再做第二次保存了，这也是为社么要先查找匹配的原因
    if(oldData.length == 0){
        const data = await mysql('nideshop_search_history').insert({
            'user_id': openId,
            'keyword':keyword,
            'add_time':parseInt(new Date().getTime() / 1000) //转换成时间戳的格式保存起来
        })
        if(data){ //data存在，那就是插入成功
            ctx.body = {
                data:'success'
            }
        } else {
            ctx.body = {
                data:'fail'
            }
        }
    } else {
        ctx.body = {
            data:'已经有记录了'
        }
    }
}



//模板抛出，先把方法抛出去，以保证，routes/index的addhistoryaction能获取到
module.exports = {
    addHistoryAction,
    indexAction
}
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
    const brandList = await mysql('nideshop_brand').where({
        is_new:1
    }).orderBy('new_sort_order','asc').limit(4).select() //获取了然后输出到页面
    //new_sort_order字段升序查找，用limit限制取4个

    //新品首发
    const newGoods = await mysql('nideshop_goods').whereIn('id',[1181000,1135002,1134030,1134032]).andWhere('is_new',1).select()
    // 查询nideshop_goods表，我们只查询部分，用id字段来直接选定5条,并且判断is_new字段是否为1（是新品）

    //人气推荐
    const hotGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price','goods_brief').where({
        is_hot: 1  //有上面那几个字段，并且is_hot都为1
    }).limit(5).select()
    //column:分别出字段

    //专题精选
    const topicList = await mysql('nideshop_topic').limit(3).select() //然后抛出

    //类别列表 ..好物
    const categoryList = await mysql('nideshop_category').where({
        parent_id: 0 //为零的字段说明都是拿来作为标题展示的
    }).select()
    //然后是 各种好物中里面都相应的有什么商品？
    const newCategoryList = []
    // 然后将在categoryList拿到的数据遍历,要把拿到的数据按不同的好物区分开来
    for(let i=0;i<categoryList.length;i++){
        let item = categoryList[i] //里面的每一项
        let childCategoryIds = await mysql('nideshop_category').where({
            parent_id:item.id //parent_id和item_id(当前这条数据的id相等的话)
        }).column('id').select() //我们就找出来        
        //然后变成数组的形式,意味着如果我们拿到[1020000，1036002]
        childCategoryIds = childCategoryIds.map((item)=>{
            return item.id
        })
        // console.log(childCategoryIds);
        //拿到跟parent_id相等的数据之后去商品表中找到在childCatagoryIds里的7条数据
        const categoryGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price').whereIn('category_id',childCategoryIds).limit(7).select()
        newCategoryList.push({ //把我们要的挑出来 
            'id':item.id,
            'name':item.name,
            'goodsList':categoryGoods //list里的内容
        })
        //column找出这里面的字段，判断它们是否存在于（whereIn）childCatagoryIds这个数组当中，存在就去限制limit
    }

    //往页面上输出。查询语句会把结果给banner，banner又通过'banner'字段往前端输出
    //往页面上输出。查询语句会把结果给channel，channel又通过'channel'字段往前端输出,重启后端项目看看
    ctx.body={
        'banner':banner,
        'channel':channel,
        'brandList':brandList,
        'newGoods':newGoods,
        'hotGoods':hotGoods,
        'topicList':topicList,
        'newCategoryList':newCategoryList
    }
}
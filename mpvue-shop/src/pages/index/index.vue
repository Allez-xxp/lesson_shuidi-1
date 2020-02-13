<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
        <!-- block标签，无具体含义，通常用来做for循环.
        <swiper-item>代表每一张轮播图 
        写了banner数据源中就要记得加一个banner,从哪来？
        src要用v-bind绑定一下,因为是动态要动态获取的-->
      </swiper>
    </div>
    <div class="channel">
        <div v-for="(item,index) in channel" :key="index" @click="categroyList(item.id)"> 
          <img :src="item.icon_url" alt="" />
          <p>{{item.name}}</p> 
          <!-- image样式占的位置太大了，去调样式 
          加了for中的channel数组就要在数据源中添加,channel数据源也需要从接口中获取来，那就继续去做接口请求-->
        </div>
    </div>
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商直供
      </div>
      <!-- 加一个点击跳转到品牌直供总页面的单击事件 -->
      <div class="content">
        <!-- 为了只展示四个，我们用表中的is_new来筛选 -->
        <div v-for="(item,index) in brandList" :key="index" :@click="branddetail(item.id)" >
          <div>
            <p>{{item.name}}</p>
            <p class="price">{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="" >
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <!-- p{新品首发} -->
          <p>新品首发</p>
          <p>查看全部</p>
        </div>        
      </div>
      <div class="list">
        <ul>
          <!-- li要有左右滚动的效果用scroll-view容器,:scroll-x="true"X轴方向上的滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <!-- p{新品首发} -->
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>        
      </div>
      <div class="list">
        <ul>
          <!-- li要有左右滚动的效果用scroll-view容器,:scroll-x="true"X轴方向上的滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in topicList" :key="index" @click="topicdetail(item.id)">
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <!-- 价格直接做一个定位 -->
                <div>{{item.price_info}}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item,index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div v-for="(subitem,subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import { mapState,mapMutations } from 'vuex'
import { get } from '../../utils'  //导入封装的get请求(在index.js里)
// 后面不加index,因为会默认加上/index.js
export default {
  data (){
    return{
      // cityName:'南昌'
      banner:[],
      channel:[],
      brandList:[],
      newGoods:[],
      hotGoods:[],
      topicList:[],
      newCategoryList:[]
    }
  },
  computed:{ //计算属性
  // 在计算属性computed中解构，将mapState解构，解构出数据源里的cityName
    ...mapState(['cityName']) //可以直接拿到页面中展示<div @click="toMappage">{{cityName}}</div>
  },
  // 一进去首页，benner图就要出现。所以请求这个数据的方法应该是自执行的。也就意味着要放到生命周期函数中
  mounted(){
    this.getData()
    this.getCityName()
  },
  methods:{
    ...mapMutations(['update']),
    toMappage(){
      //授权否？通过wx.getSetting先查询一下用户是否授权"scoped.record"
      let _this=this
      wx.getSetting({
        success:(res)=>{
          //如果没有同意授权则打开设置
          // console.log(res)
          if(!res.authSetting['scope.userLocation']){
            // wx.openSetting 打开授权位置信息
            wx.openSetting({
              success:res=>{
                //获取授权位置信息
                _this.getCityName()
              }
            })
          }else{
            wx.navigateTo({
              url:'/pages/mappage/main',
            });
            // _this.cityName='北京'
            // _this.getCityName()
          }
        },
        fail:(err)=>{
          console.log(err)
        },
        complete:()=>{}
      });
    },
    getCityName(){
      let _this=this
      var myAmapFun = new amapFile.AMapWX({key:'947040d1a5c8185746d3cd82f38f24c3'});
      myAmapFun.getRegeo({
        success:function(data){
          //成功回调
          console.log(data)
          // ......
        },
        fail:function(info){
          //失败回调
          console.log(info)
          // _this.cityName='北京'
          _this.update({cityName:'北京'})
        }
      })
    },
    
    async getData(){
      // wx.request 封装接口请求，去utils
      // 这里是取数据源的，那就应该调用刚写的接口，那么就需要在当前页面引入get,post这两个方法
      // 导航的banner图我们采用get方法，那么导入get
      // 此时的get的url可以写成任何样子，因为此处的路径是等会做后端开发时自己定义的路径，记得等会要与后端的一致
      const data=await get('/index/index') //后端必须有一个http://localhost:5757/lm/index/index
      // 这里的get方法是封装的请求
      // 拿数据
      console.log(data)//现在还看不到拿到的数据是什么，因为还没写后端的项目
      // 那么开始后端 用koa2提供/index/index接口给我们这里使用
      // 数据库的数据能输出了之后，接下来打通banner图的前后端协作连接，将数据成功渲染到页面中去。
      //把拿到的数据给到数据源中的banner[]
      this.banner = data.banner
      this.channel = data.channel
      this.brandList = data.brandList
      this.newGoods=data.newGoods
      this.hotGoods=data.hotGoods
      this.topicList=data.topicList
      this.newCategoryList=data.newCategoryList
    },
    toSearch(){
      wx.navigateTo({
        url:'/pages/search/main'
      })
    },
    categroyList(id){ //有了id才知道具体要跳到哪里
      wx.navigateTo({
        url:'/pages/categroyList/main?id=' +id
      })
    },
    branddetail(id){
      wx.navigateTo({
        url:'/pages/branddetail/main?id=' +id
      })
    },
    tobrandList(){
      wx.navigateTo({
        url:'/pages/brandList/main'
      })
    },
    goodsList(info){
      if(info == 'hot'){
        wx.navigateTo({
        url:'/pages/newgoods/main?isHot=' +1
      })
      }else{
        wx.navigateTo({
        url:'/pages/newgoods/main?isNew=' +1
      })
      }
    },
    topicdetail(id){
      wx.navigateTo({
        url:'/pages/topicdetail/main?id=' +id
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped样式私有化
@import "./style.less";
</style>
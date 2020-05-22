<template>
  <div class="goods">
      <div class="swiper">
          <!-- 多久播放一次interval 一张动画持续时间duration -->
          <!-- block在小程序中没有实际作用，通常用他当一个容器，做for循环等操作 -->
          <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
              <block v-for="(item,index) in gallery" :key="index">
                  <!-- 没给swiper-item这个容器放样式，因为这个容器会被编译，他是一个块级容器，相当于默认也有一个继承，宽高是继承父容器的 -->
                  <swiper-item class="swiper-item">
                      <img :src="item.img_url" alt="" class="slide-image">
                  </swiper-item>
              </block>
          </swiper>
          <!-- 手机上手指触摸屏幕的高亮显示，通常我们回去干掉这个操作：hover-class="none" -->
          <!-- 当手机触摸屏幕的时候，会被添加上一个为none的类名， -->
          <!-- 有关小程序的分享，必须要使用button按钮，这是小程序官方文档规定的，还不能是普通的，得加上一个open-type="share" 这个属性-->
          <!-- 加了open-type这个属性，小程序才会认可当前这个按钮能够触发分享功能 -->
          <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
      </div>
      <div class="swiper-b">
          <div class="item">30天无忧退货</div>
          <div class="item">48小时快速退款</div>
          <div class="item">满88元免邮费</div>
      </div>
      <div class="goods-info">
          <div class="c">
              <p>{{info.name}}</p>
              <p>{{info.goods_brief}}</p>
              <p>￥{{info.retail_price}}</p>
              <div class="brand" v-if="brand.name">
                  <p>{{brand.name}}</p>
                  <!-- brand哪里来？数据源中没有，先添加上 -->
              </div>
          </div>
          <!-- 先放好基本解构，然后放样式，然后放数据 -->
      </div>
      <!-- 点击了，遮罩层就出来了，由这里决定遮罩层出不出来 -->
      <div class="section-nav" @click="showType">
          <div>请选择规格数量</div>
          <!-- 用来装》箭头的 -->
          <div></div>
      </div>
      <!-- 商品参数 -->
      <div class="attribute">
          <div class="head">
              商品参数
          </div>
          <div class="item" v-for="(item,index) in attribute" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.value}}</div>
          </div>
      </div>
      <!-- 图片展示 -->
      <!-- 因为这部分有很多图片，所以加上一个v-if有的时候才出来，让页面加载不那么重 -->
      <div class="detail" v-if="goods_desc">
          <!-- 放上一个微信自带的标签，做图片预览功能-->
          <!-- 需要放上一个content参数，里面放的内容是需要展示的数据内容 -->
          <!-- 当前这个wxParser这个标签我们是没有的，要做一个额外的处理,要引入 他不是小程序自带的是mpvue中带的-->
          <wxParse :content="goods_desc" ></wxParse>
      </div>

      <!-- 常见问题 -->
      <div class="commom-problem">
          <div class="h">
              <!-- 用一个小程序里的标签text -->
              <text class="title">常见问题</text>
          </div>
          <!-- 然后问题和答案作为一个模块,有4组，用一个for循环 -->
          <div class="b">
              <div class="item" v-for="(item,index) in issueList" :key="index">
                  <div class="question-box">
                      <!-- 首先前面有一个点，然后后面是问题 -->
                      <text class="spot"></text>
                      <text class="question">{{item.question}}</text>
                  </div>
                  <div class="answer">{{item.answer}}</div>
              </div>
          </div>
      </div>

      <!-- 大家都在看 -->
      <div class="commom-problem">
          <div class="h">
              <!-- 用一个小程序里的标签text -->
              <text class="title">大家都在看</text>
          </div>
          <!-- 然后问题和答案作为一个模块,有4组，用一个for循环 -->
          <div class="submit">
              <div class="" v-for="(subitem,index) in productList" :key="index">
                  <img :src="subitem.list_pic_url" alt="">
                  <p>{{subitem.name}}</p>
                  <p>￥{{subitem.retail_price}}</p>
              </div>
          </div>
      </div>

      <!-- 底部footbar -->
      <div class="buttom-fixed">
          <!-- 点击后，collect能再加上一个类名 -->
          <div class="collect-box" @click="collect">
              <!-- 收藏 -->
              <div class="collect" :class="[collectFlag ? 'active': '']"></div>
          </div>
          <div class="car-box" @click="toCart">
              <!-- 购物车 -->
              <div class="car" >
                  <!-- 角标，就是有几件商品在购物车 -->
                  <span>{{allnumber}}</span>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588136330960&di=e8c24af3df84caa2d5e3e87bbd9a4857&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F21%2F07%2F5b6aec225946c_610.jpg" alt="">
              </div>
          </div>
          <div @click="buy">立即购买</div>
          <div @click="addCart">加入购物车</div>
      </div>

      <!-- 选择规格的弹出层 -->
      <!-- 这个pop作为遮罩层显示  -->
      <!-- 遮罩层，默认是不出现的，所以pop这个盒子用一个v-show,(v-if：用它来控制现实和隐藏的时候，是直接控制html结构是否被编译，如果被编译，编译与不编译都会触发浏览器的重塑和回流操作，所以如果有一块DOM结构是频繁出现和消失的时候，用v-if就会加大浏览器的性能消耗，v-show：只是在修改css的显示与隐藏，不会触发html结构的重塑和回流，） -->
      <!-- 然后点击遮罩层和叉叉都能把弹出层叉掉，遮罩层绑定一个点击事件 -->
      <div class="pop" v-show="showpop" @click="showType"></div>
      <!-- 动态绑定一个类名，用来修改弹出层的样式，同时，弹不弹出有遮罩层出没出来决定 -->
      <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
          <div class="top">
              <div class="left">
                  <img :src="info.primary_pic_url" alt="">
              </div>
              <div class="right">
                  <div>
                      <!-- 价格具体是多少是接口请求回来的 -->
                      <p>价格￥{{info.retail_price}}</p>
                      <p>请选择数量</p>
                  </div>
              </div>
              <!-- 叉叉 -->
              <div class="close" @click="showType">x</div>
          </div>
          <div class="b">
              <p>数量</p>
              <div class="count">
                  <!-- 做一个加减的输入框 -->
                  <div class="cut" @click="reduce">-</div>
                  <!-- 双向绑定一下数据，记得在数据源中写上number -->
                  <input type="text" class="number" v-model="number" disabled="false" />
                  <!-- 加上add方法 -->
                  <div class="add" @click="add">+</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { get, post } from '../../utils'
import wxParse from 'mpvue-wxparse' 
//有一个组件叫mpvue-wxparse

export default {
    data() {
        return {
            gallery:[], //banner轮播图，要有图，得去做接口请求，这里先用日式懒人沙发为例
            id: '',
            openId: '',
            info: {}, //是一个对象
            brand: {},
            showpop: false,
            number: 0,
            attribute:[],
            goods_desc:'',
            issueList: [], //常见问题
            productList: [],
            collectFlag: false, //是否收藏
            goodsId:'',
            allnumber: 0
        }
    },
    components: {
        wxParse
    },
    //处理商品分享的标题和内容，小程序自带的一个方法:
    onShareAppMessage(){
        // 商品的名字是在getDetail接口请求的时候能拿到的，而且商品的详情信息已经放到数据源中去了的
        console.log(this.info.name); //输出了undefined，没拿到，为什么？
        // 因为我们拿到的data中的info是个数组，然后里面的第一条信息才是我们的商品详情，
        //所以我们在后端调整一下ctx.body中的info//现在后端输出就不再是一个数组，而是一个对象了
        // 然后数据源中之前定义的info:' '=>info:{} (一个对象)
        // 数据出来了，说明这个方法被触发了，然后可以做配置：小程序的语法
        return {
            title: this.info.name,
            path: '/pages/goods/main?id' + this.info.id, //想要将当前小程序的哪一个页面当作分享图片的看到的页面
            // 后面的这个id是数据库中有的，当别人点击小程序进来这个页面的时候，没有这个id是看不到东西的，当前数据详情页的展示必须要用到id去做接口请求
            imageUrl: this.gallery[0].img_url //就是分享的那个图片,限定一下，不然会实时截屏小程序的页面当作我们分享的时候的图片
            // 直接放第一张图片作为分享的图片展示
        }
    },
    methods: {
        //详情的数据请求
        async goodsDetail() {
            // get得去引入
            const data = await get('/goods/detailaction', {
                // 要请求当前沙发的详细信息，就要传给后端id(可以唯一标识这个商品),在数据源中放上一个id
                // id的值，应该是从上一个页面接受过来的
                // 这里先直接复制一个id
                id: 1009024,
                openId: this.openId //还得知道是哪一位用户在看这个商品，不然不知道商品要分享给哪一个用户的好友
                // 小程序的本地存储已经有了，在生命周期中，直接取出来用,去数据源中放一下openId:''
            })
            console.log(data);//要能拿到商品的详情信息
            this.info = data.info
            this.gallery = data.gallery
            this.attribute = data.attribute
            this.goods_desc = data.info.goods_desc
            this.issueList = data.issue
            this.productList = data.productList
            this.goodsId = data.info.id //从这里拿到商品id,然后拿到别的接口去使用
            // 需要一进来就根据数据库中的数据来判断数据源中的是true还是false
            this.collectFlag = data.collected //这个字段哪里来？我们这个接口没有这个字段，去添加一个
            this.allnumber = data.allnumber //看存放购物车数据的表中有几条数据
        },
        // 控制弹出的盒子是否展示
        showType(){
            // 在数据源中先放上一个showpop
            this.showpop = !this.showpop
        },
        add(){
            this.number +=1
        },
        reduce(){
            // 要判断一下减到1的时候判断
            if(this.number > 1) {
                this.number -=1
            } else {
                return false
            }
        },
       // 收藏，第一次点击了之后，收藏了，下次进来还是收藏状态，所以所以要存到后端去，所以要做后端接口请求
        async collect(){
            this.collectFlag = !this.collectFlag //因为要通过这个判断是否要加active类名
            // 添加接口，并传递openId因为要知道当前商品是被谁收藏了,还要知道是哪件商品被收藏了
            const data = await post('/collect/addcollect', {
                openId: this.openId,
                goodsId: this.goodsId //要在数据源中放上 //这个id就是info中有一个id的字段
            })
            // console.log(data); //只要点击了星星就会触发这个//然后去后端routes
        },
        // 只需要进行页面跳转,因为要跳到的是我们footbar中的购物车页面
        toCart() {
            // 不再是跳页面，而是底部的导航栏页面，所以不能用navigate
            wx.switchTab({
                url: '/pages/cart/main',
            })
        },
        // 立即购买
        //
        buy() {
            if(this.showpop) {
                // 就是input框中的number
                if(this.number === 0) {
                    // 还没添加商品的时候
                    // 这个微信官方的api
                    wx.showToast({
                        title: '请选择商品数量',
                        duration: 2000, //因为toast会自动消失的，所以写一个延迟时间
                        icon: 'none',
                        mask: true, //显示蒙层 防止弹出层出来的时候页面的其他地方还能点，这样遮住就不能点了
                        success: res => {}
                    })
                    return false //弹出了这个toast后之后的操作就不用做了，直接return false
                }
                const
            }
        },
        addCart() {

        }
    },
    mounted() {
        // 取openId
        this.openId = wx.getStorageSync('openId') || '';
        this.goodsDetail();
    }
}
</script>

<style lang="less" scoped>
/* 引入样式 */
@import './style.less';
@import url('~mpvue-wxparse/src/wxParse.css');
</style>
<template>
  <div class="goods">
      <div class="swiper">
          <!-- 多久播放一次interval 一张动画持续时间duration -->
          <!-- block在小程序中没有实际作用，通常用他当一个容器，做for循环等操作 -->
          <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
              <block >
                  <swiper-item class="swiper-item">
                      <img src="" alt="" class="slide-image">
                  </swiper-item>
              </block>

          </swiper>
      </div>
  </div>
</template>

<script>
import { get, post } from '../../utils'

export default {
    data() {
        return {
            gallery:[], //banner轮播图，要有图，得去做接口请求，这里先用日式懒人沙发为例
            id: '',
            openId: ''
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
        }
    },
    mounted() {
        // 取openId
        this.openId = wx.getStorageSync('openid' || '');
        this.goodsDetail();
    }
}
</script>

<style>

</style>
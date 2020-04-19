<template>
  <div class="mappage">
      <div class="section">
          <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput">
      </div>
      <scroll-view :scroll-y="true" class="addcont" style="height:500rpx;">
          <!-- 因为会搜索到很多条数据，所以我们一定放上一个v-for -->
          <div class="result" @touchstart="bindSearch(item.name)" v-for="(item,index) in tips" :key="index">
              <!-- 放搜索出来后跟南昌相关的地点信息 -->
              {{item.name}}
          </div>
      </scroll-view>

      <!-- 页面下面再放一张地图，用于显示当前自己的实时位置 -->
      <div class="map_container">
          <div class="title">显示当前位置:</div>
          <!-- 小程序中已经封装好的一个标签map -->
          <map class="map" id="map" scale="16" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
      </div>
  </div>
</template>

<script>
import amapFile, { AMapWX } from '../../utils/amap-wx'//引用高德地图的api
import { mapMutations }  from 'vuex' //注意！要直接把mutations中的方法拿出来用就需要引用，然后在methods中解构，解构update方法，这样才能用
export default {
    data(){
        return{
            tips:[],
            longitude:0,
            latitude:0,
            markers:[],
            keywords:''
        }
    },
    mounted(){//生命周期(函数) 获取当前地理位置 一进来这个页面就显示地图
        this.getMapaddress()//调用这个方法
    },
    methods:{//是个属性 写方法
        ...mapMutations(['update']),
        getMapaddress(){
            //调用高德地图，获取当前位置
            let _this = this //在高德地图中有回调函数，为防止this的作用域被修改先在这里保存一下
            // console.log(_this)
            //myAmpFun相当于获得了地理位置信息的高德地图的代表
            var myAmapFun = new amapFile.AMapWX({key:'947040d1a5c8185746d3cd82f38f24c3'})
            myAmapFun.getRegeo({//是有一些参数支持的
                iconPath:"static/tabs/home.png",//表示当前点的图标
                iconWidth:22,
                iconHeight:32,
                // 回调函数
                success(data){
                    console.log(data) //先打印一下这个回调参数
                    let marker=[//因为返回的是一个数组
                    {
                        id:data[0].id,
                        latitude:data[0].latitude,
                        longitude:data[0].longitude,
                        width:data[0].width,
                        height:data[0].height
                    }
                    ]
                    _this.markers=marker //用来装我们地图上的标记的
                    _this.longitude=data[0].longitude //经度
                    _this.latitude=data[0].latitude
                },
                fail(info){
                    console.log(info)
                }
            })
        },
        bindInput(e){
            // console.log(e)
            let _this=this
            let keywords=_this.keywords
            var myAmapFun=new amapFile.AMapWX({key:'947040d1a5c8185746d3cd82f38f24c3'})
            // getInputtips是用来搜索补全的
            myAmapFun.getInputtips({
                keywords: keywords,
                location: '',
                success:function(data){
                    // console.log(data) 与keywords有关的词条
                    if(data && data.tips){
                        //把data.tips放到我们定义的tips上去
                        _this.tips=data.tips//并且他是放在scroll-view中的，可以上下滚动的
                    }
                }
            })
        },
        bindSearch(cityName){
            // 多页面传值，也是非父子组件通信 store
            //key值就是我们在数据源中我们放的名字，value是state中拿到的值
            //因为是mutations中的方法，要直接拿来用的话需要引入
            this.update({cityName:cityName})  //已经存进数据源了，然后回到首页
            wx.navigateBack({//返回页面
                delta:1  //1代表返回上1个页面，2代表返回上两个页面
            });

        }
    }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
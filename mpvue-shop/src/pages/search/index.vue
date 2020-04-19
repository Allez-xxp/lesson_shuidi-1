<template>
  <div class="search">
      <div class="head">
          <div>
            <img src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png" alt="">
            <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
            <img @click="clearInput" class="del" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3594958599,3080810534&fm=26&gp=0.jpg" alt="">
          </div>      
        <div @click="cancel">取消</div>
      </div>
      <!-- 就像我们消息的键盘右下角有发送或者是回车，这个状态只可以自主更改的。Confirm-type只能在type=”text”的时候才能设置。
      focus="true" 是允许聚焦 
      @focus绑定一个focus,j聚焦事件：当搜索牙刷显示了牙刷商品，当再次点击input框时，收起商品展示，回到搜索条。
      @input=""再绑定input事件，在小程序中input事件展示搜索提示信息。
      @confirm="searchWords"就是当点击搜索的时候要做的事,电脑上默认是回车。-->
      <!-- 有和没有所搜索的商品，两个div应该是只能存在一个的，所以放v-if -->
      <!-- words=''时，这个盒子会不见 -->
      <!-- @input这个方法，绑定input事件，就是在input框中只要有内容发生变化都会执行input当前绑定的这个方法 -->
      <!-- v-if和v-for不能放在同一个dom结构中,那就在外面再加一层专门放if的div -->
      <div class="searchtips" v-if="words">
        <div v-if="tipsData.length !=0">
          <div v-for="(item,index) in tipsData" :key="index" >
            {{item.name}}
          </div>
        </div>
        <!-- 与前面的v-if应该形成一个v-else -->
        <div class="nogoods" v-else>数据库暂无此类商品...</div>
      </div>
      <div class="history" v-if="historyData.length!==0">
        <div class="t">
          <div>历史纪录</div>
          <!-- 垃圾桶 -->
          <div @click="clearHistory"></div>
        </div>
        <!-- 展示曾经搜过的历史纪录 -->
        <div class="cont">
          <div v-for="(item,index) in historyData" :key="index" @click="searchWords" :data-value="item.keyword">
            {{item.keyword}}
          </div>
        </div>
      </div>
      <div class="history hotsearch">
        <div class="t">
          <div>热门搜索</div>
        </div>
        <div class="cont">
          <!-- <div class="active">日式</div> -->
          <!-- 搜索记录放页面上 -->
          <div v-for= "(item,index) in hotData" :key="index" :class="{active: item.is_hot === 1}" @click="searchWords" :data-value="item.keyword">
            {{item.keyword}} 
          </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import { get,post } from '../../utils'  //导入封装的get请求(在index.js里)
export default {
  data (){
    return {
      words:'',
      openid:'',
      hotData:[],
      historyData:[],
      tipsData:[]  //专门用来装输入的提示语的
    }
  },
  mounted (){
    this.openid = wx.getStorageSync('openId') || ''; //this.openid往本地存储把openid取出来,小程序其他页面要用也要把openid取出来再用
    // 这样我们才有了openid,然后数据源中的openid会在页面初次渲染的时候取得到，然后能去做接口请求，拿到后端返回过来的数据（那三个关键字)
    this.getHotData() //先看下效果，去页面搜索/search/indexaction
  },
  methods:{
    clearInput(){
      this.words='shenm'
    },
    cancel(){

    },
   async clearHistory(){
      // 做接口请求
      const data = await post('/search/clearhistoryAction', {
        openId: this.openid //把这个id对应的对应的所有的历史纪录都清空
      })
      // console.log(data, '123');//data没拿到，但是123能拿到，说明接口请求没事，后端能拿到openId,
      if(data) { //为null,那就为false。我们在删除成功的情况下执行下面的
        this.historyData = [] //重置为空数组
      }
    },
    inputFocus(){

    },
    //取到input框当中的值，然后实时的去做接口请求
    async tipsearch(){
      //接口请求第一步，async+await + 接口请求的方法+接口+传过去的参数
      const data = await get('/search/helperaction', {
        keyword: this.words //拿到用户真实输入的内容然后去查询对应的关键字
      })
      //调用了接口请求之后
      console.log(data, 'tiptip') //这里的输出是接口请求之后穿过来的输出
      //拿到了keywords数组,然后要把它保存下来，数据源中放上一个tipsData = []
      this.tipsData = data.keywords;

    },
    async searchWords(e){ //因为是要做接口请求的方法，所以直接写成异步方法
    //是有两种方法是可以拿到input框中的值的：1.this.words,拿到数据源中的值（vue中的语法，双向数据绑定）2.我们用的这个（小程序当中的语法）
    // console.log(e) //看看这个事件参数中会存在什么东西(电脑上直接回车看结果，手机上点搜索按钮)
    //考虑到兼容性问题，还是用这个：
    // console.log(e);
    let value = e.currentTarget.dataset.value  //事件参数
    this.words = value || this.words //有value就用，没有就用vue的双向数据绑定
    //然后用这个word去做接口请求。引入get,post接口才能继续逻辑开发
    //添加历史搜索记录的接口（请求的路径）；请求到的数据要做的操作是？第二个操作传参数(data)
    // console.log(this.openid, this.words); //发现前端是没有问题的，那就是后端的问题
    const data = await post('/search/addhistoryaction',{ 
    //这个接口是专门用来往数据库中插入数据用的

      //传两个这样的参数给当前这个接口
      openId:this.openid, //用来区分不通用户的搜索记录
      keyword:value || this.words //搜索框搜索的内容
    })
    // console.log(data) //现在还不能在控制台看到data,因为当前的接口addhistoryaction还未被定义出来，那么我们去后端。
    //routes/index.js->search/index写完给数据库添加搜索记录的接口之后，去浏览器5757/lm/search/addhistoryaction看看 not found,接口是需要传入参数的，所以我们在放上一个取历史搜索记录的方法。
    //取搜索记录(应该是实时出现的，也就是存的同时也要拿出来展示)
    this.getHotData()
    },
    async getHotData(first){
      //热门搜索和历史纪录都是只能看自己的，所以一定要this.openid
      //以路由传参的方式，
      const data = await get('/search/indexaction?openId=' +this.openid) //this.openid从哪里来？所以要在数据源放上一个id
      //openId是之前定义的一个参数的key值，跟数据源无关，openid是我们需要去取到的用户的身份信息
      //取出记录 同时将历史搜索记录和热门搜索都取出来的，这个接口
      this.historyData = data.historyData
      this.hotData = data.hotKeywordList //要与后端的一致
      // console.log(data) //然后我们先去后端把indexaction接口定义出来。
    }
  }
}
</script>

<style lang='less' scoped>
@import './style';
</style>
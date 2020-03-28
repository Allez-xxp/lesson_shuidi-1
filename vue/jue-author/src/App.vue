<template>
  <div id="app">
    <div class="title">掘金</div>
    <div class="nav">
      <div class="head">
        作者榜
      </div>
      <div class="content" v-for="(item,index) in author" :key="index">
        <!-- <img src="http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg" alt="">
        <div class="author">
          <p style="font-size:20px; font-wight:blod; color:#000;">jonne</p>
          <p>掘金能手</p>
          <p>掘金作家</p>
        </div> -->
        <img :src="item.img" alt="">
        <div class="author">
          <p style="font-size:20px; font-wight:blod; color:#000;">{{item.name}}</p>
          <p>{{item.intro}}</p>
          <p>{{item.iden}}</p>
        </div>
      </div>
      <div class="button">完整榜单 > </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      author: [
        {
        img: 'http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg',
        name: "网",
        intro: "掘金",
        iden: "作家"
        },
        {
        img: 'http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg',
        name: "网",
        intro: "掘金",
        iden: "作家"
        },
        {
        img: 'http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg',
        name: "网",
        intro: "掘金",
        iden: "作家"
        }
      ]
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title{
  width: 100%;
  padding: 30px;
  border: 1px solid #000;
  color: #006CFF;
  font-size: 36px;
}
.nav{
  width: 20%;
  padding: 5px 20px;
  margin-right: 300px;
  float: right;
  /* border: 1px solid #000; */
  text-align: left;
}
.head{
  text-align: left;
  padding: 10px 20px;
  border: 1px solid #F0F0F0;
}
.content{
  width: 730rpx;
  height: 30%;
  margin: 2px auto;
  display: flex;
  border: 1px solid #F0F0F0;
}
img{
  /* display: inline-block; */
  width: 30%;
  height: 30%;
  padding: 6px;
}

p{
  margin: 4px auto;
  font-size: 16px;
  color: #909090;
}
.button{
  text-align: left;
  padding: 10px 20px;
  border: 1px solid #F0F0F0;
  color: #007FFF;
}



#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

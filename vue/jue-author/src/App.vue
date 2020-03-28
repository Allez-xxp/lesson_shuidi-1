<template>
  <div id="app">
    <div class="title">掘金</div>
    <div class="nav">
      <div class="head">
        作者榜
      </div>
      <div class="content">
        <img src="http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg" alt="">
        <div class="author">
          <p>jonne</p>
          <p>掘金能手</p>
          <p>掘金作家</p>
        </div>
      </div>
    </div>
  </div>
</template>

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
  padding: 5px 20px;
  margin-right: 300px;
  float: right;
  /* border: 1px solid #000; */
  text-align: left;
}
.head{
  text-align: left;
  padding: 40px 0;
  border: 1px solid #fff;
}
.content{
  width: 730rpx;
  margin: 0 auto;
  display: flex;
  border: 1px solid #fff;
}
img{
  /* display: inline-block; */
  width: 30px;
  height: 10%;

}



#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

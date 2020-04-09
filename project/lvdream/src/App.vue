<template>
  <div id="app">
      <div>
        <h1>lvdream</h1>
        <input type="button" value="登录" @click = "flag = !flag">
        <input type="button" value="注册" @click= "flag= !flag">
      </div>
      <Menu active-name="1-2" :open-name="['1']">
        <Submenu name="1">
          <template slot="title">
              <Icon type="ios-analytics" />
              班级
          </template>
          <MenuGroup title="Item 1">
              <MenuItem name="1-1">我的班级</MenuItem>
              <MenuItem name="1-2">加入新班级</MenuItem>
          </MenuGroup>
          <MenuGroup title="Item 2">
              <MenuItem name="1-3">Option 3</MenuItem>
              <MenuItem name="1-4">Option 4</MenuItem>
          </MenuGroup>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
              <Icon type="ios-filing" />
                同学
          </template>
          <MenuItem name="2-1">Option 5</MenuItem>
          <MenuItem name="2-2">Option 6</MenuItem>
            <Submenu name="3">
                <template slot="title">招聘信息</template>
                <MenuItem name="3-1">内推码</MenuItem>
                <MenuItem name="3-2">offer</MenuItem>
                <MenuItem name="3-3">面试追踪</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-cog" />
                群
            </template>
            <MenuItem name="4-1">我的群</MenuItem>
            <MenuItem name="4-2">这个群</MenuItem>
            <MenuItem name="4-3">群</MenuItem>
            <MenuItem name="4-4">各种群</MenuItem>
        </Submenu>
      </Menu>        
      <!-- 需求： 点击按钮让h3显示 在点击隐藏 -->
      <!-- 使用transition元素(Vue官方提供的) 把需要被动画控制的元素包裹起来 -->
      <transition name ="my">
          <!-- <h3 v-show = "flag">这是一个h3</h3> -->
          <form action="" v-show = "flag">
            <input type="text" placeholder="用户名">
            <input type="text" placeholder="密码">
            <button>登录</button>
            <button>取消</button>
          </form>
      </transition>
    <!-- <div class="Toptab">
      <h1>lvmeng</h1>
      <button @click="login">登录</button>
      <button type="button">注册</button>
    </div>
    <div></div> -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
    }
  },
  methods: {
    // login() {

    // }
  }
}
</script>
<style>
h1{
  display: inline-block;
  width: 90%;
  border: 1px solid #666;
  height: 80px;
  box-sizing: border-box;
  line-height: 80px;
  /* 出不来？？ */
  padding-left: 50px; 
  background-color: #cdbded;

}
form{
  z-index: 999;
  border: 1px solid #000;
  height: 200px;
  width: 300px;
}
#nav{
  text-align: center;
}
/* v-enter 是进入之前 这是一个时间点 此时还没有进入  */
/* v-leave-to 这是一个时间点 是动画离开之后 是一个终止点 动画已经结束*/
.my-enter,
.my-leave-to{
    opacity: 0;
    transform: translateX(150px);
}
/* v-enter-active [入场动画的时间段] */
/* v-leave-active 【离场动画的时间段】 */
.my-enter-active,
.my-leave-active{
    transition: all 1s ease;
}
</style>

<template>
  <div id="app">
    时间 {{ t | format_date }}     
    <!-- 返回的是欧洲格式的时间 -->
    <div>{{moment()}}</div>
    <!-- mm和ss必须小写 hh是使用12小时时间制，HH时24小时时间制-->
    <div>{{moment().format('YY-MM-DD HH:mm:ss')}}</div>
    <!-- diff将当前时间与moment(t)时间产生比较 -->
    <div>过去了{{moment().diff(moment(t), 'minutes')}}分钟</div>
    <div>2020-02-29的两年后是{{moment('2020-02-29').add(2,'year').format('YYYY-MM-DD HH:mm:ss')}}</div>
    <div>2020-02-29的两天后是{{moment('2020-02-29').add(2,'day').format('YYYY-MM-DD HH:mm:ss')}}</div>
  </div>
</template>
<script>
import moment from 'moment'; //也是一个对象,要在date里面声明进去
export default {
  name:'App',
  //过滤器，当需要置换美元，格式化输出时，就可以用filter
  // filters:{
    // format_data(value){ 根据原来的date格式化一下
    //   const date =new Date(value);
    //   return `${date.getFullYear()} 年 ${date.getMonth()+1}月 ${date.getDate() }日`
    // }
  // },
  data(){
    return{
      t:1583397831402, //时间戳，记得不能是字符串，用+new Date()得出
      moment //作为当前的date引入进去
    }
  },
  computed:{

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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

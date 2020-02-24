<template>
  <div>
      <div class="container">
          <i-input v-model="searchData" placeholder="输入你想要查找的商品" class="search" size="large">
              <Button slot="append" icon="ios-search" @click="seach"></Button>
          </i-input>
          <!-- Tag是要for循环的，所以要注意写法 加一个span-->
          <Tag v-for="(item,index) in promotionTags" :key="index" closable @on-close="closeTags(index)" >
              <span @click="selectTags(index)">
                {{item}}
              </span>
          </Tag>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchData:'',
            promotionTags: ['买2免1','领200神券','每日红包','199减100','生日礼物','拼单']
        }
    },
    methods:{
        seach(){
            // console.log(this.searchData);
            //点击搜索应该去到搜索结果的页面去，通过跳转链接
            // 路由的push，就是会进入一个新的地址
            // http://localhost:8080/search?searchData=123
            // 然后去设计路由，routes/index.js,因为我们还没有能跳转的页面
            this.$router.push({
                path:'/search',
                query: { //查询请求，是路由跳转的api
                    searchData: this.searchData
                } 
            })
        },
        selectTags(index){
            // console.log(this.promotionTags[index]);
            this.searchData = this.promotionTags[index];
        },
        // 不喜欢就关掉
        closeTags(index){
            //把点了叉叉的项目删掉,splice根据下标切第几个
            this.promotionTags.splice(index,1);
        }
    }
}
</script>

<style scoped>
/* scoped只作用于本组件，不影响外界 */
.container{
    padding-top: 15px;
    margin: 0 auto;
    margin-bottom: 1px;
    width: 460px;
}
.search{
    margin: 5px 0px;
}
</style>
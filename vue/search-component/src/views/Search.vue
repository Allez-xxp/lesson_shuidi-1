<template>
  <div class="search">
      搜索结果
      <hr />
      {{this.$route.query.searchData}}
  </div>
</template>

<script>
export default {
    name:'Search',
    components:{

    },
    // 使用生命周期，当它挂载之后
    mounted(){
        console.log(this.$route.query.searchData);
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
<template>
    <div>
        View
    </div>
</template>
<script>
export default {
    created(){ //生命周期函数，当组件加载时就会触发这个函数
        // console.log('创建了');
         let province = this.$route.path; //拿到路由中的路径，this.$route可以获取当前路由下的相关内容
        console.log(province)
    }
}
</script>
<style scoped>

</style>
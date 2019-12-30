<template>
    <ul class="switches">
        <li 
        v-for="(item,index) in switches"
        :key="item.id"
        class="switch-item"
        :class="{'active':currentIndex===index}"
        @click="switchItem(index)"
        >
        <span>{{item.name}}</span>
        </li>
    </ul>
    <!-- :key=""优化循环用的:循环中一项变了，只变这一项 -->
</template>
<script>
export default {
    props:{
        switches:{
            type:Array,
            // required:true
        },
        currentIndex:{
            type:Number,
            default:0
        },
       
    },
     methods:{
            switchItem(index){
                this.$emit('switch',index);
            }
        }
}
// props外面要传参过来
</script>
<style lang="stylus">
@import "../../common/styl/variable"
.switches
    display flex
    align-items center
    width 240px
    margin 0 auto 
    .switch-item
        flex 1
        padding 8px
        margin 0 20px
        text-align center
        font-size $font-size-medium
        font-size 16px
        color $color-text-l
        // color white
        border-bottom 2px solid $color-theme
        &.active
            color #ffffff
            border-bottom 2px solid $color-text-l

</style>
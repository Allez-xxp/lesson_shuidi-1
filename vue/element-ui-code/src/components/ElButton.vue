<template>
  <button
    class="el-button"
    :class="[
    type ? 'el-button--' + type : '',
    {
        'is-round':round,
        'is-plain':plain
    }
    ]"
  >
  <!-- ElButton 有了icon 这个就能去掉了 -->
  <i v-if="icon" :class="icon"></i>
  <!-- 用span 包裹文字 ,文字就是slot 为什么写if?因为如果是只是一个icon  $slots是组件的所有的插槽-->
  <!-- <span v-if="$slots.solt"><slot name="solt"></slot></span> -->
  <span v-if="$slots.solt"><slot></slot></span>
  <!-- 如果在声明slot的时候不给name,也就是说有一个默认的slot,那就直接输出来
  前面传了name,slot为 $slots.solt -->
  
  </button>
  <!-- 基础类名el-button有了它，才是一个按钮 
  动态类名，中括后，里面的类名是需要根据类型动态输出的
  type ? 'el-button--' + type : '',
  'is-round',
  round ? 'is-round' : '',
  key-value方式：json object方式，只要后面的结果为真，vue中就会把前面的类名(key)给动态绑定的class-->
</template>

<script>
export default {
    props:{
        type:{
            type:String, //类型可以在App.vue中自定义输入的，有type参数
            default: 'default' //因为可以根据官网看到，原始的是el-button--default
        },
        round:{
            type: Boolean,
            default:false
        },
        plain:{
            type: Boolean,
            default:false
        },
        icon: String,
    },
    computed:{

    }

}
</script>

<style>

</style>
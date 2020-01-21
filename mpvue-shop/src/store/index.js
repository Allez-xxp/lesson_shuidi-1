import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{//数据源
        cityName:'定位中。。。'
    },
    mutations:{
        update(state,config){ //将数据源当中的所有的key值所对应的value值都替换成当调用update传进来的第二个参数里面的config[item]
            Object.keys(config).map((item,key)=>{
                state[item]=config[item]  //拿到state数据源中每一个item->代表Object.keys返回的数组当中的每一个值也就是cityName
            })  //遍历对象(config这个参数)当中所有的key值,,会以一个数组的形式返回，用map再遍历一下
        }
    }
})

export default store; //抛出store
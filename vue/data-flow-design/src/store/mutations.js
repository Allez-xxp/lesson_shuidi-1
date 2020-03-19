// 写项目先写mutation和state,action后面写
// 围绕状态，设计改变,要有一定设计模式 mutation
//user cartList products
//login false true
//vuex语法
import {
    RECORD_USERINFO,
    ADD_CART,
    INCREMENT_QUANTITY,
    CHECKOUT
} from './mutation-types'

export default {
    //注册用户信息的函数
    //login接口返回{avatar:'',username:''}
    // record_userinfo(state, info) {  //mutation中vuex会提供state
    //中括号中就像json object中的一个变量
    // 变成常量
    [RECORD_USERINFO]() {
        state.userIfo = info;  //页面头像
        state.login = true  //是否登录了
    },
    // cartList?
    // add_cart(state, { productId }){
    [ADD_CART](state, { productId }){


    },
    [INCREMENT_QUANTITY](state,{ productId }){

    },
    [CHECKOUT](){

    }
}

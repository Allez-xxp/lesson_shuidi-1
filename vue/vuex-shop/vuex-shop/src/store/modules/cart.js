import products from "./products"

//每个模块中有四大家族
const state = {
    items: [],
    checkoutStatus: null
}
const mutations = {
    pushProductToCart(state, { id }){
        state.items.push({
            id,
            quantity:1
        })
    },
    incrementItemQuantity(state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++   //因为是一个对象，所以是一个引用式赋值，这里改变了，数组中的数据也会改
    }
}
const actions = {
    addProductToCart({commit},product){
        // console.log(payload)
        // console.log(product)
        if(product.inventory > 0 ) {
            const cartItem = state.items.find(item =>item.id === product.id)
            if(!cartItem){
                commit('pushProductToCart',{id: product.id})
            } else {
                commit('incrementItemQuantity', cartItem)
            }
        }
        // 将当前状态下的items
        return state.items.map(({id, quantity}) =>{

            // rootState根节点上
            // const product =rootState.product.all.find(product => product.id ===id)
            // return {
            //     title: products.title,
            //     price: products.price
            // }
        })
    }
}
const getters = {

}
export default {
    namespaced: true, //命名空间
    state,
    mutations,
    actions,    
    getters
}
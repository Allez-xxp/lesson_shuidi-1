// vuex中有states getters action mutations
// react中有state，reducer（实现了mutations，会生成一个新的状态返回）,actions
export const getBannerList = () => {
    return (dispatch) => {
        // 修改
        // 有了action后 ajax请求就被管起来了
        getBannerRequest().then(data => {
        const action = changeBannerList(data.banners);
        dispatch(action);
        }).catch(() => {
        console.log("轮播图数据传输错误");
        }) 
    }
}
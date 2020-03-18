const _products = [
    {
        id: 1,
        title: 'ipad 4 Mini',
        price: 500.01,
        inventory: 2 //限制库存量
    }
];
export default {
    getProducts(cb){ //传一个回调函数过来cb
        setTimeout(()=>{
            cb(_products)  //传products数据
        },1000)
    }
}
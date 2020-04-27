// 传了api地址，约定要进行类型检测，一定要约定类型
// method直接写一个string类型，有点问题，typescript类型约定不够，他应该是get post..5种，不是随便一个字符串就可以的
// 单独定义一个接口(用来限制method的类型)
// interface + type
type HttpMethods = 'get' | 'GET' | 'post' | 'POST' | 'DELETE' | 'delete';
//或者使用enumer枚举类型
//特别的函数，它需要去一定要return一个Promise,因为那边要.then
// 声明的是一个匿名函数，但是返回了Promise有点问题，所以声明一下更进一步的约定 不是只是一个json object是一个Promise
// 首先箭头函数返回的一定是一个Promise类型，any是typescript中表示什么类型都可以
type FuncType = (url: string, method: HttpMethods) => Promise<any>; //注意要用type 不是const声明
// ts中的type的意思，定义一个类型，让代码更严谨

//约定他是一个函数，为什么？
const fetchData: FuncType  = (url: string, method: HttpMethods) => {
    // 返回一个Promise，welcome.tsx那边才能thenable
    return new Promise((resolve, reject) => {
        // 发出数据请求，数据来了之后.then然后来res
        // 这里没有使用axios 是原生的fetch
        fetch(url)
        .then(res => res.json()) //json化之后再.then
        .then((response) => {
            resolve(response);
        })
        .catch(err => reject(err))
    })
    // 会去请求这个url中的数据，请求完了就能到页面上去渲染页面，再约定一下，fectchData是一个函数
}

// umi中antd = element-ui
// 这里面提供的是组件库,
// umi创建完项目后我们直接有了一个后台项目 umi antd pro 会给我们一个已经可以运行的项目，并且是admin,这种就适合用来开发后台
// antd pro是已经运行的项目的框架，多了一个pro，多生成了一些文件，是可以运行的，然后基于它进行二次开发
export {
    fetchData
}
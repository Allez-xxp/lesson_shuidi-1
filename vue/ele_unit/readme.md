# 2020春招名企就业
- 三端正 vue + node + mongodb 全网最佳github 项目
    感谢大家， 感谢三元老师
    三生三世桃花开  vue 前端
    vue 面试准备课程 
    vue语法  组件化  写开源项目 ？
    面试大厂的 
    三  vue 单页应用   node 写Api    后台开发 (admin)   
    整站开发  宏观视野  全栈能力   
    32.2k  vue   应用给大家

    后台。
    element-ui  后台开发框架   iview
    1. 登录
    后台是给编辑 特效 讨好 体验
    vue false true

    transition vue 的面试初期考题 
    为了方便的加特效  
    1. 不会在DOM里出现 
    2. 子元素上会有进与出  v-if v-show 结合
    3. 四个类两个场景 动态的向子元素加类名
    4. 冯 显示 隐  transition-name-enter(一帧) -> transition-name-enter-active   子元素原来的样式  transition-name-enter未进入的样式 transition-name-enter-active  设置transtion-time all 1s
    退  在 -> 不在  transition-name-leave-active 

    # 晚上 打通后台与node后端
# 奇怪的地方
1. 用的status登录而不是用户名密码
与api的开发经验有关，因为会垮项目，所以提前约定好数据接口，
{
    status:1(用户名密码正确)，0(用户名密码错误) //由此可以先将前端先写完，暂时不必过多考虑后端
    message:'用户名密码错误'
} url(可变到底是送往哪边) 传送data(是不变的) response(约定)
后台(user_name,password 8080 使用了一个代理vue.config.js proxy)->node(3000)

mock.js是什么？是在前端没有后端的支持的时候，模拟一下后端数据，有点假数据的感觉，方便

alias vue2.0的build/webpack.config.js
@ src/
~ assets/
作业，在vue3.0如何配置别名路径呢？vue.config.js中配置
2. 在我们的后台项目中(admin)，我们使用的模块化vue是export defaule{} +import from
es6使用import from关键字
api中require(') 然后用module.exports common.js方案
- 为什么？
vue是用的是es6，因为是单页应用，是个前端的项目，前端使用babel+webpack做了编译 
前端发展的比较前卫，对es6支持,
node是后端，以稳定为主，版本更新没那么快，对体系支持的较慢，对老的common.js的形式的更支持(支持原生的)
模块化就是代码的封装
- 能统一吗？
可以。如何统一前后端的模块化？
向谁统一？向先进的一方靠拢
将node中的模块化变成使用es6
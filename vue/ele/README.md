https://github.com/bailicangdu/vue2-elm

1. 入手，快速入手的视野
2. 注意细节

- rem
css中的相对单位
是html的font-size 所有设备自适应
vue单页应用中怎么做rem的适配，不能写死。希望16rem=100%(动态宽度的100%)
16就是引入了栅格系统，一行由16格组成 8:8(两列对等) 
html得去做一个fontsize计算

引入rem生成框架 阿里有个flexible

- 设计一个组件 header组件

yarn add stylus stylus-loader 会自动启用stylus写样式

1. head组件设计 css 
common.styl reset
mixin.styl css 模块化，功能化
封装 mixin
2. 

# common
1. 组件开发
weui 静态ui组件，静态页面；通用组件，两者无明确区别，功能上稍稍有一点区别。
设计一些这样的组件，为未来写组件发布到npm做好准备，如何设计通用性组件？
弹出一个提示框，新建一个common/alertTip.vue
借助weui
介绍一点data和props后，来到App.vue

2. 画出图标 svg css 

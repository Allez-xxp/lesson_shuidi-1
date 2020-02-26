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
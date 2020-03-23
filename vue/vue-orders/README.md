1. 前后端分离
前端不写node,后端不写vue,所以前后端要有一个数据流通问题
有文档，有约定
前端有个mock ,后端若没传数据时，前端需要用到

orders表 mongodb数据，之前引用过 10万条订单数据
migration 

要解决的问题 
产品经理，订单 做个报表 看到订单数据 （用户看不到，是后台数据）
table 一页展示20条数据，分页 多少页？
根据月份，地区，商品进行数据的筛选
怎么做？
1. 要把订单数据展示出来，element-ui
el-table 将数据通过表格的方式展示
el-pagination 分页器
2. 数据在哪里？node?实际开发中，前端不会用node而是mock模拟一下
3. mock 的牛逼在于，未来只要且一个url,就可以上线

- el-table + el-table-column 集合组件和子组件的关系
展示数据 数据可视化canvas echart
将:data="list"中的数据循环展示
分水岭，会不会做，是不是高手
1. table pagintation 联动
数据的 ajax page list 动起来了
前后端分离，
前端模拟真实数据，mockjs
我们现在和后端是分的，界面开发和后端api开发是异步的，不能等接口，也不能自己写node，可能会达不到需求，不能上线的
mokejs是业内的解决方案，等到后端给接口，只要改一下url，甚至不用改，就能无缝连接上线
yarn add mockjs
在main.js中引入，在项目中添加mock文件
yarn add axios http请求
改了main.js要重启项目
- 想要进行一些格式化的操作
<template>
给格子里面的内容加些标签，加些内容时，加些修改时，作为列的slot
<template slot-scope="{row}"> //范围区域是在一行row
      <span>{{row.orderDate}}</span> //显式地把数据放到这里，这样就不仅是一个值，还是一个有标签的
</template>
   

mock.js
https://github.com/nuysoft/Mock/wiki/Syntax-Specification#%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF%E5%AE%9A%E4%B9%89%E8%A7%84%E8%8C%83-dtd
mock的造数据魔法API |100
@cname |+1自增加一
url 提供
可拔插的功能，在后端不给力的时候插入，给力的时候拔掉
前端有了mock 不需要后端在开发阶段支持你
"status": "created" //如何在三种状态随机？？
头条面试题

数据  简历 文章 发npm 竞赛  算法 

图片 延迟加载
http 并发  chrome 并发有限
PC   wifi的情况下图片的下载会很快，他要做的优化是  http 并发太多， 图片加载之间会竞争，会阻塞，会使页面打开速度下降
手机 4G  要考虑流量问题 

axios 是做请求的 ajax 封装
小程序  图片懒加载 yarn add vue-lazyload

有可以优化的地方吗？ 

菊花图 3-5年前的东西

1. 图片类型有哪些？ 
jpg jpeg svg  gif bmp  png  webp 
banner位（广告）， 色彩丰富的平面设计稿  jpg jpeg 
webp  代替jpg google 新的图片格式标准 效果一样的前提下， 省28%-》 40%的大小  网页性能提升 , webp 代替 jpg 
  webp 有些浏览器不支持 
  node 图片处理  .jpg   .webp  新的压缩方案
  里面的像素点还是一样的 jd   提供了两套图片
2. 上线流程  webp  webp-converter
  .jpg old    .jpg.webp chrome new 这两个浏览器都支持
3. png 支持透明图 更大  jpg  不太适合做大图 ,适合图标图片
4. gif 动图 更大
5. 雪碧图  几张图片组成的 css position   有效地将http 的请求数降下来
6. base64 化 png小图标可以base64化，完全用编码表示，更小  vue 






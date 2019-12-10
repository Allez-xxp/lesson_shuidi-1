浏览器也叫上网代理proxy
https://movie.douban.com/top250 get请求返回的是网页html 渲染render
postman response 的是html
爬虫其实就是模仿postman的功能
-发出http请求 request_promise(npm i request_promise)
 (异步的时候会用到promise)
 request (做url请求的)+promise 等到请求完之后(再去分析得到html)
 then
-分析得到html
 扣字出来

爬虫依赖的三个模块：
 "dependencies": {
    "cheerio": "^1.0.0-rc.3",
    "request": "^2.88.0",
    "request-promise": "^4.2.5"

cheerio可以把html文档在内存中渲染出来，渲染成一个dom树

作业：10页都拿到 且都存成文件
-/top250 爬
 pagination
 a href
 得到urls数组 对该数组进行for循环，然后request
 再加上最开始的for循环（取一页的那个for循环）

 
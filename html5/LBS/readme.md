代码在www.taobao.com  
我们现在的代码主要是在localhost 127.0.0.1
买了域名后 本地-》aliyun  域名
怎么代码 在淘宝的域名上跑？
前端第一个难题：
运行代码，需要在本地支持www.taobao.com

C:\Windows\System32\drivers\etc改host文件 用vscode打开

1. #   127.0.0.1       localhost-> #	127.0.0.1       www.wolaile.com
2. 加 ： 127.0.0.1       www.taobao.com
3. 127.0.0.1       localhost-》# 127.0.0.1       localhost  

课后记得改回来
http://www.taobao.com:8080/ 出现我们运行的html文件

www.taobao.com 这个IP   上淘宝 这是域名 最后还是会配置为
找ip: (IP是一个网站的家庭住址) 但是我们访问网站使用的是域名 不是ip 如果在本地使用过(本地会缓存的),就能立马访问了；
没访问过的就会去向最近的运营服务商询问 找到映射，再没有就再往上一级查找 
最高的是 www 域名系统 国内有 在没有 就去美国，因为是美国发明的
在本地的域名缓存中先查找

host 就是 负责 本地域名查找时 先到这里查找 看是否配置 程序员在本地的host文件就能将本地设置为其他的域名 比如www.taobao.com

但现在直接访问taobao.com是有问题的
2. 如何干掉8080 ?
nginx
vue vue.config.js  proxy 8080  
/api/users/create-> proxy <---> 3000
这里证明既然8080端口可以这样转到3000端口
web网站默认在80端口
反向代理 www.taobao.com:80  -》  www.taobao.com  default_post 80
nginx 是高性能的http服务器
配置一下反向代理
：80  default 不用加 www.taobao.com 默然使用80端口提供服务
8080 live-server 由80端口代理
3. 算我离肯德基有多远
百度地图 有一个api
把自己的坐标 店的坐标（是在数据库中） 会算出 自己离店有多远

https://www.cnblogs.com/milkmap/p/6138519.html 经纬度 chrome 设施了权限 只有拿到了https的才能拿到
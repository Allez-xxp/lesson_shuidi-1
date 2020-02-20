商城，
手机要建一个表 collection
老牌的express 的一个生成器generator：
npm i -g express-generator 生成一个后端项目
- 电商类的全栈应用
使用express编写api，vue做单页应用，这个api前端通过Ajax调用。
bin文件夹中的www是未来网站上架后的入口，由engine调用。

1. vue-cli会给我们一个vue项目的模板
express后台的项目模板 npm i -g express-generator，生成器，生成后端项目的模板 app.js是入口文件。
bin的www,会负责启动项目，找到端口，端口默认是3000端口createServer(app)-》listening
npm run start 会把bin/www文件运行。yarn start 启动项目。http://localhost:3000/
添加一个model文件夹，模型层
mongodb的驱动装一下：yarn add mongoose 全称使用js驱动。

来到app.js进行模型存储，数据存储
新建routes下的api,去routes/api/index构建路由
/api 前后端分离 分离的后端
前端用vue

show dbs;
use meituan;
show collections;
db.manufacturers.find({});
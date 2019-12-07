npm init -y 项目的初始化
Java一样来做后端，企业及开发框架
npm init egg(模板命令egg是个文件夹名)
npm init --type=simple（简单的egg.js项目）
应用开发目录app

- app
  node 代表应用程序 app是应用程序的主要代码
- config 配置文件夹
- test 测试目录

- egg架构
  有一个脚手架快速构架项目结构
  web http协议
  router.js 
  ->controller(要继承controller类)（ctx.request.body)
  ->model(就可以写sql语句了)

  -npm i sequelize-cli -D
   -D是 只是开发阶段用的，上传后不用
    devDependencies 开发阶段的依赖 对mysql的处理
    创建表
    执行sql查询
    sequelize-cli (command-line 命令行工具)

-sequelize 命令行集锦
 sequelize init初始化mysql的工作目录
 - config.json可以改变相应数据库、密码
 sequelize db:create 创建一个数据库
 创建一个表 可放登录注册等信息
秋招胜出:node + go
node:
1. Docker 基于发布的 是CI 的部分 程序集成
2. 数据处理能力: 深入的mongodb + mysql + serveless 索引，分布式概念...
3. 搜索能力: ElasticSearch
4. kafka rocked..消息队列
消息队列 发邮件
5. 微服务
6. 推荐系统 算法工程师
7. 秒杀系统
8. redis 内存数据库

1. elasticsearch  全文检索
kibana 是elasticsearch的展示端 5601端口，用于将elasticSearch 数据可视化 d3.js
mongodb是数据的仓库  查询 索引 
应用越来越复杂的时候 还有专门的索引仓库 很多数据的时候 所有人要能快速的搜索信息
CRUD操作 只要给url+methods restful 每个动作，都有特定的语义
GET select
POST save
PUT/PATCH 修改
DEETE
HEAD
OPTION

movie 索引库
orders 订单数据 原始数据 可以放到elastic里面跑 -》索引数据

GET /movies(是url)/_search(是命令)?q=2012(查询的参数)
9200 elasticsearch的端口

1. url请求进来
2. elasticSearch 检索
搜索到的结果 elastic会打分  还能根据id查询  全文检索
3. mongodb中进行元数据查询

1. 装Java环境
2. 解压缩 elasticsearch kibana
3. 进入bin目录 D:\Program Files\lvmengdownload\elasticsearch-7.3.2\bin 这是他的启动目录
使用 elasticsearch他就会在9200端口上测试 http://localhost:9200/  就有版本出来
4. 开另一个终端 复制kibana路经 进入bin目录 用kibana启动 5601端口就是数据可视化端口kibana的一个示符端口 http://localhost:5601
5. 在elastic_search下添加一个node_elastic_search_user文件
npm init -y
yarn add express(用来运行java)
yarn add elasticsearch
body-parse 处理post 请求数据

kibana控制台：
http://localhost:5601/app/kibana#/dev_tools/console
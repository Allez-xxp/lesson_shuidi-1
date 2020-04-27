react + ts + antd(ali的框架) + react hooks
npm init -y
yarn create umi antd-pro-tags
回车 yes
cd antd-pro-tags
yarn安装依赖
然后启动一下这个企业级的开发框架
yarn start

yarn create是一个脚本 要创建某种类型的项目就用 他回到GitHub上把代码拖下来

来到/src/page/welcome.tsx

interface/index.js
在这里定义ITag定义，约定每一个tag类型是什么样的
发现他要求是要是一个.ts文件，rename一下

umi是一个整栈的开发框架，可以用它来开发react项目 antd
他是怎么做mock的？

util/fatch.ts
umi中antd = element-ui
这里面提供的是组件库,
umi创建完项目后我们直接有了一个后台项目 umi antd pro 会给我们一个已经可以运行的项目，并且是admin,这种就适合用来开发后台
大部分上班之后就是用element-ui / antd去做后台，
antd是组件库
antd pro是已经运行的项目的框架，多了一个pro，多生成了一些文件，是可以运行的，然后基于它进行二次开发

method直接写一个string类型，有点问题，typescript类型约定不够，他应该是get post..5种，不是随便一个字符串就可以的
单独定义一个接口(用来限制method的类型)
interface + type
ITags有类型约束， fetchData中的method有类型约束

interface type的概念

打开welcome.tsx的useEffect的fetchData会报404错

找到mock，新建tag.ts

回到welcome.tsx

新建组件TagItem/index.tsx
在react中组件的.tsx和.less文件是一起搭档的，一个负责做组件，一个负责组件的样式
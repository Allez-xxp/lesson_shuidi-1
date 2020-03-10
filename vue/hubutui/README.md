- 开发一套UI框架
https://juejin.im/post/5e63d1c36fb9a07cb427e2c2
发布到npm上去，安装的时候npm install hubutui

npm约定，packages目录是ui库的开发目录
原来的src改成examples
packages/Button/src/index.vue Button的具体实现
packages/Button/index.js Button按钮的入口文件

我们将src重命名为examples, 并添加packages目录,用来存放我们的自定义组件.
但是cli默认会启动src下的服务,如果目录名变了,我们需要手动修改配置,vue-cli3中提供自定义打包配置项目的文件,我们只需要手动创建vue.config.js即可.
首先修改入口文件地址为examples下的main.js,其次将packages加入打包编译任务中.
然后进行组件编译，引入一下button 看能不能用
然后把packages/index.js复制进来

测试一下代码examples/main.js
去examples/App.vue用一下

然后配置一下package.json文件
    "lib": "vue-cli-service build --target lib --name hubutui --dest lib packages/index.js"
然后yarn lib
其次我们需要编写package文件的description,keywords等,
"description":"the first ui write by huhuilin",
  "keywords":[
    "component",
    "components",
    "vue",
    "vue-component"
  ],
  "homepage":"https://github.com/hhl1206",
  "license":"MIT",

  来到npmjs.org
  发布 
  // 本地编译组件库代码
    yarn lib
    // 登录
    npm login
    // 发布
    npm publish
    // 如果发布失败提示权限问题,请执行以下命令
    npm publish --access public

PS D:\LESSION_SHUIDI\vue\hubutui> npm login
Username: linanhu
Password:
Email: (this IS public) 1919412022@qq.com
Logged in as linanhu on https://registry.npm.taobao.org/.
PS D:\LESSION_SHUIDI\vue\hubutui>

npm notice total files:   24
npm notice
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://registry.npm.taobao.org/hubutui - [no_perms] Private mode enable, only admin can publish this module

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\ASUS\AppData\Roaming\npm-cache\_logs\2020-03-10T10_35_28_010Z-debug.log
PS D:\LESSION_SHUIDI\vue\hubutui>

注意将npm 源改回 npmjs.org   http://registry.npmjs.org
PS D:\LESSION_SHUIDI\vue\hubutui> npm config set registry http://registry.npmjs.org
PS D:\LESSION_SHUIDI\vue\hubutui> npm login
Username: linanhu
Password:
Email: (this IS public) 1919412022@qq.com
Logged in as linanhu on http://registry.npmjs.org/.
PS D:\LESSION_SHUIDI\vue\hubutui>
记得去激活邮箱
然后就能在其他项目中安装了
yarn add hubutui
main.js中import：
import hubutui from 'hubutui'
// css也要引入,在node_modules中
import 'hubutui/lib/hubutui.css'

Vue.use(hubutui);//这里就会调用之前写的install方法，将所有组件装上来
然后就能去应用层使用App.vue
<x-button type="primary" >x-button按钮</x-button>
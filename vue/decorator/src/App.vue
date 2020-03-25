<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-table
      :data="list">
    <el-table-column
      label="日期"
      width="180">
    <template slot-scope="scope">
      <i class="el-icon-time"></i>
      <span>{{scope.row.date}}</span>
    </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name"
      width="180">
      <template slot-scope="scope">
        <!-- 解释  移上去的时候触发-->
        <el-popover trigger="hover" placement="top">
          <p>姓名：{{scope.row.name}}</p>
          <p>住址：{{scope.row.address}}</p>
          <div
            slot="reference"
            class="name-wrapper">
            <!-- 与el-popover组合，因为解释是飘在什么上面的，所以需要一个tag slot="reference"与...相关 -->
              <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
    <template slot-scope="scope">
      <el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>
    <!-- handleDelete拿到要删除的index scope.$index第几行-->
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { MessageBox } from 'element-ui';
//将handleDelete没有confirm功能的毛坯函数装修到有confirm功能 es7的功能
function confirmation(target, name, descriptor) {  //参数是@会给的,descriptor本来是什么样的
  //哪里要装饰，就放在哪里
  // console.log(target, name, descriptor);
  let oldValue = descriptor.value;
  console.log(oldValue); //函数装修前 //this.list.splice(index, 1);
  descriptor.value = function(...args) { //原来要做的先写上，我们只是做装修
    // console.log(args); //点了一下删除，就会出来，看做了什么
    MessageBox.confirm('确定要删除吗？', '提示')
      .then(oldValue.bind(this, ...args))  // bind old this
      .catch(()=>{

      })
  }
}
export default {
  name: 'App',
  data(){
    return {
      list:[{
        date:'2016-05-02',
        name: '王小虎',
        address: '上海普陀区金沙江路185弄'
      },{
        date:'2016-06-04',
        name: '历向',
        address: '上海普陀区金沙江路1519弄'
      },{
        date:'2016-05-02',
        name: '小明',
        address: '上海普陀区金沙江路1575弄'
      },{
        date:'2016-05-02',
        name: '大海',
        address: '上海普陀区金沙江路1575弄'
      }]
    }
  },
  methods: {
    //装饰器，将确认装饰到handleDelete方法中
    // 这里的报错是es-lint，但其实是没关系的。装个插件可以消掉
    @confirmation
    handleDelete(index, row) {
      // console.log(index, row);
      //删除前，提醒，用组件
      //MessageBox的js呼唤方式
      // MessageBox.confirm('您确定删除吗？', '提示')
      //   .then(() => {  //去确认的时候
      //     // console.log(arguments);
      //     this.list.splice(index, 1);
      //   })
      //   //点取消要写这个,不然会报错
      //   .catch(() => {
      //     // console.log(arguments);
      //   })
      this.list.splice(index, 1);

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <div>
      <input type="file" @change="handleFileChange"/>
      <el-button @click="handleUpload">上传</el-button>
      <el-button @click="handleResume">恢复</el-button>
      <el-button @click="handlePause">暂停</el-button>
    </div>
    <div>
      <div>计算文件hash</div>
      <el-progress :percentage="hashPercentage"></el-progress> 
      <!-- 进度条 -->
      <div>总进度</div>
      <!-- 每个blob进度？怎么计算？每个blob上传的速度是总上传速度的一部分（blobs/sumblobs）
      1.每块blob都要上传 它的值（每row的percentage)是会变的 Vue中有个叫watch的能力，当值改变时监听它再计算一次
      2.需要用到vue里面计算属性的概念（computed属性），就是怎么拿到fakeUploadPercentage的值呢，是需要计算公式的
      
      -->
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
    </div>
    <!-- 多个切片上传的进度 格式化一下 -->
    <!-- el-table是数据驱动的组件 [{a:1}] https://element.eleme.cn/#/zh-CN/component/table 
    data会在后面的this.data中获取切片的数据-->
    <el-table :data="data"> 
      <el-table-column prop="hash" label="切片hash" align="center" >
      </el-table-column>
      <el-table-column label="大小(kb)" align="center" width="120">
        <template v-slot="{row}">{{row.size | transformByte}}</template> 
          <!-- ？？row绑定对应那一行的size值,用prop:"size"会有单纯的数据 transformByte过滤器(Vue的) 对应filters,用于将数据的一种格式变成另一种格式-->
      </el-table-column>
      <!-- el-table-column内部如果需要输出一段html就要用到template来进行slot占位 -->
      <el-table-column label="进度" align="center"> 
        <template v-slot="{row}">
          <el-progress :percentage="row.percentage" color="#909399">
          </el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
const SIZE = 0.5 * 1024 * 1024;
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
};
export default {
  name: 'app',
  filters:{
    transformByte(val){
      return Number((val/1024).toFixed(0)) //变成kb,且不要小数位
    }
  },
  computed:{
    uploadPercentage(){ //还仅仅只是一个计算属性 
      //需要监听的值,当前没有上传文件，或者
      if(!this.container.file || !this.data.length) return 0;
      const loaded=this.data
      .map(item => item.size * item.percentage) //把获得的数据map一下,且把当前data里面每个切片的已将上传的大小()
      .reduce((acc,cur) => acc + cur) //已上传的总文件大小
      //map数组里有个reduce()方法，把blob的进度加起来再除以总文件的大小就能得到总进度
      return parseInt((loaded / this.container.file.size).toFixed(2));//保留两位小数
    }
  },
  watch:{
    uploadPercentage(now){  //会一直监听文件的改变,now:新的值传递进来
       if(now > this.fakeUploadPercentage){ //如果监听到有新的值进来
        this.fakeUploadPercentage=now
       }  
    }
  },
  data: () => ({ //这个data是api里的，要跟container里的区别开来
  fakeUploadPercentage:0,
    container: {
      file: null,
      hash: "",
      status: Status.wait,
    },
    //或status:'waiting' 刚开始的状态是等待上传
    hashPercentage:0,
    data:[], //放置着要上传的数据
    requestList:[] //放xhr的数组的（每个切片都会是一个独立的xhr对象,每个切片的传输都会用一个ajax对象去传递)
  }),
  methods: {
    async handleResume(){
      this.status=Status.upload;
      const {uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      await this.uploadChunks(uploadedList );
    },
    handlePause () {
      this.status = Status.pause; // 状态停
      this.resetData();
    },
    
    resetData () {
      this.requestList.forEach(xhr => xhr.abort()) //requestList这里面放置着xhr列表，控制请求列表
      this.requestList = [];
      if (this.container.worker) { //如果正在进行hash计算
        this.container.worker.onmessage = null;//不再监听了
      }
    },
    // 封装的request就是便于之后的代码复用
    request({ //request请求封装返回一个Promise，然后就可以promise.all,用promise封装一个请求要花时间的东西
    url,
    method='POST',
    data,
    onProgress=e=>e,
    headers={},
    requestList //我们要上传的文件列表
    }) {
      return new Promise(resolve=>{ //拥有一个resolve能力
      //重要xhr对象！！是js的ajax对象，通过XML主动发出请求
      const xhr=new XMLHttpRequest(); //url,发送的数据，请求头信息
      xhr.open(method,url);//通过open,打开对URL的请求（主动的）

      //还得加点对onProgress的调用
      xhr.upload.onprogress = onProgress;//??小写的onprogress

      Object.keys(headers).forEach(key=>{
        xhr.setRequestHeader(key,headers[key]) //为请求加头信息
        }) //如果用户传了headers（是个json），他就表示请求之中要把头附带上这个请求
        xhr.send(data);//你还要不要附带数据呢？如果有数据，在POST时send就是data,如果是get那就是null
        xhr.onload = e=>{ //添加一个事件监听onload
        console.log(e.target.response, '+++++++++++'); //received file chunk ++++++++
        if(requestList){
          // xhr使命完成了，就把他从requestList拿掉
          const xhrIndex=requestList.findIndex(item=>item===xhr);
          //将当前的xhr对象在整个请求列表里面（requestList）查找下标（使用item），便历的（item）要等于当前的那个（xhr）
          requestList.splice(xhrIndex,1); //切掉这个
        }
        resolve({
          data:e.target.response //服务器端返回的东西交给resolve
          });
          }
          if(requestList){
          requestList.push(xhr); //要控制xhr对象，这样才能控制每个请求
          console.log(requestList);
        }
          });

      },
    handleFileChange(e) {
      const [file] = e.target.files;
      //  console.log(e.target.files);
      if (!file) return;
      this.container.file = file;
      //重置
      this.resetData();//把上次的东西清空，就可以再上传其他文件了。进度条没重新再走，奇怪？
      Object.assign(this.$data, this.$options.data());//data的数据回到最初
      
    },
    async handleUpload () {
      if (!this.container.file) return;
      this.status = Status.uploading; //要上传了,上传uploading 或者this.status='uploading';(良好的代码习惯)
      const fileChunkList = this.createFileChunk(this.container.file);//上传之前将文件的分片，利用http的并发能力
      //调用了切片的函数后打印一下切片的文件
      console.log(fileChunkList); 
      this.container.hash = await this.calculateHash(fileChunkList);//用来计算hash的方法

      // 如果文件内容是一样（hash）,同样的没必要再上传多次，所以有shouldUpload(你是否还需要上传)：true,false(pass上传成功)
      const { shouldUpload,uploadedList }=await this.verifyUpload( //函数封装，这个函数负责文件上传，上传之前先验证一下
        this.container.file.name,
        this.container.hash
      );
      console.log(shouldUpload,uploadedList); //true 这里要注意！
      // 是否上传过
      if(!shouldUpload){ //不需要上传
        this.$message.success("秒传：已经上传成功"); //可以先把为false的情况测试下if(shouldUpload){
        this.status=Status.wait; //状态设置为wait又可以进行下一次上传
        return ;
        // 调用element，会在this上挂载message组件
      }
      // 没有上传过，现在开始上传,记得在前面定义data
      this.data = fileChunkList.map(({ file },index)=>({
        fileHash:this.container.hash, //是整个文件的hash(唯一的)
        index, //第几个
        hash:this.container.hash + "-" +index, //每个块都有自己的index在内的hash,可排序，可追踪（就能知道哪些传送失败然后重传）
        chunk:file,
        size:file.size,
        percentage:uploadedList.includes(index)? 100:0 //当前切片是否上传过
        // 已经上传的list里面包含下标(说明是曾经已经上传过的文件)。uploadedList在verifyUpload里面。
      }));
      //开始上传切片，把已经上传过的列表传过去
      await this.uploadChunks(uploadedList);
      //每一个是一个file*
      //这里的data,由fileChunkList.map()构建起来

     }, //变成async,里面将会有大量的任务,就能用await了
    async uploadChunks(uploadedList=[]){
      // console.log(this.data);
      // es6提供的好处：把数据数组this.data=>请求数组=>并发请求
      const requestList=this.data
      .map(({ chunk , hash , index } )=>{
        const formData=new FormData();//就是用js方式构建form的能力。formData是js里面构建body(传输的post里的表单的对象)，可以把我们要传的东西append到formData中去。
        formData.append("chunk",chunk);//文件blob
        formData.append("hash",hash);//比较文件 (当前切片的hash)
        formData.append("filename",this.container.file.name); //查找，要把它放到哪个目录下的（目录下多个子文件）,文件名（等下拼完了之后叫什么名字）
        formData.append("fileHash",this.container.hash);//文件的总hash
        return {formData,index}
        //map返回数组的项被return后形成一个新的数组
        //formData也在返回的数据中，等会交给下一个map     

      })
      .map(async ( {formData,index} )=>
       this.request({ //返回
            url:"http://localhost:3000",
            data:formData,
            onProgress:this.createProgressHandler(this.data[index]), //文件上传成功的回调,已经处理了多少的加载，把上传了多少的数据项也上传上去
            requestList:this.requestList //？
            //requestList是个数据项，要定义一下
          })
      )
      await Promise.all(requestList);//对应我们的请求
      // 做完恢复和暂停可以做合并请求了
      // 之前上传的切片数量+本次上传的切片数量=所有切片数量
      if(uploadedList.length+requestList.length==this.data.length){
        await this.mergeRequest();  //那么就可以发送了
      }
      console.log('可以发送合并请求了');
    },
   async mergeRequest(){  //合并请求,发送后去index.js，然后去controller.js写具体的细节处理方法
     await this.request({  //封装了这个request
      url:'http://localhost:3000/merge',
      header:{
        "content-type":"application/json"
      },
      data:JSON.stringify({
        size:SIZE,  //用于算等下合并的时候大小
        fileHash:this.container.hash,
        filename:this.container.file.name 
        //把之前做的合并文件的移过来,先去index.js添加if
      })
     })
     //处理完了之后说一下已经做完了合并,使用element-UI
     this.$message.success('上传成功');
     this.status = Status.wait;
   },
    //onProgress就在这里调用
    createProgressHandler (item) {//由request的xhr.onload调用，会resolve出结果
      return e => {
        item.percentage = parseInt(String((e.loaded/e.total) * 100));//可以获得文件上传进度
        console.log(e.loaded, e.total, '----------');
      }
      //每一次upload的时候都会反复触发对这个的调用。
    },
    async verifyUpload(filename,fileHash){
      const {data}=await this.request({
        url:'http://localhost:3000/verify',
        header:{
          "content-type":"application/json"
        },
        data:JSON.stringify({ //字符串化，传过去的是二进制流
          filename,
          fileHash
        })
      })
      //然后把file_slice.html里封装的request复制进来
      // 前面是请求，请求完了要return
      return JSON.parse(data);//传过来的时候是stringify
    },
    //es6的特性，你和代码是如何结合的？定义常量能少传参数
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) }); //每一个是一个file*
        cur += size;
      }
      return fileChunkList;
    },
    async calculateHash(fileChunkList) { 
      return new Promise(resolve => {
        //什么时候返回过去呢？通过promise封装，要花时间的任务
        // 使用了web workers
        // js 是一个单线程的语言，UI是主线程（以显示UI为主），会因为计算hash(慢)而被阻塞
        // html 5 web workers会单独再开一个线程，独立于之前线程之外的线程，让它去做某个工作所以叫worker
        //做完了之后再回调页面上的主线程，这样就不会影响原来的UI,同时有能用一个异步的方式把事情完成
        // 与Promise不同，不会占有原来UI的资源，会单独开一个线程
        // 这就是html 5带来的优化，

        //会用一个新的js文件。开启一个新的线程之后就交给这个文件
        //两个线程之间通过事件订阅机制来实现的，比如postMessage，向新开的线程发送消息，等下他就能通过消息机制接收到我们传过去的file
        this.container.worker = new Worker("/hash.js");
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
          // console.log(e.data);
          const { percentage,hash} =e.data;
          // 解构出来percentage,100%的时候就会带上hash
          console.log(percentage,'-----');
          this.hashPercentage=percentage;
          if(hash){
            resolve(hash);
          }
          //当拿到服务器端的hash时才resolve()
        }
        // hash计算完了之后会调用onmessage回调函数，执行里面的代码
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
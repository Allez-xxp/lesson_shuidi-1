// web worker及基本概念
//通过内容计算md5值，相同内容md5值相同
self.importScripts("/spark-md5.min.js");

self.onmessage = e => {
    // self.postMessage({
    //     "msg" : "你好"
    // })是web-worker的基本的用法

    //通过会传过来的e.data(包含了fileChunkList)
  const { fileChunkList  } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer(); 
    //实例化一下spark，通过self再找到引入内容里的对象self.SparkMD5 
    // ArrayBuffer()可以接受二进制文件的缓冲，是node里的
    // 计算出hash值
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader(); //文件阅读对象，可以读取文件到内存
    reader.readAsArrayBuffer(fileChunkList[index].file);//通过下标知道第几个文件，读完之后就会触发onload事件
    reader.onload = e => {//利用加载完成的事件
      count++;
      spark.append(e.target.result);//把内容append进去，然后里面会有函数计算hash值
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end() //这里面就会返回hash
        });
        self.close();//关闭当前线程回到主线程，回收内存
      } else {
          //还没读完，就不能算出hash,就要花时间，那我们就要用web worker
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        loadNext(count);
      }
    };
  };
  loadNext(0);
} 
//self表示this，当前线程,可以接受从主线程传递过来的事件
// self.postMessage给主线程传消息
//复制spark-md5.min.jd文件，"你好"的内容可以注销了
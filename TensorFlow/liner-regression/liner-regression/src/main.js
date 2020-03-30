//利用vue的脚手架 可以处理es6的模块化的
//机器学习的过程，我们训练一个模型，机器学完后这个模型训练完毕
//训练一个线性回归的模型，训练完了之后让机器去测试
// cnpm i @tensorflow/tfjs @tensorflow/tfjs-vis -s
// https://js.tensorflow.org/api/latest/ 
//机器学习 https://developers.google.cn/machine-learning/crash-course/reducing-loss/an-iterative-approach

import * as tf from '@tensorflow/tfjs'; // 模板包
import * as tfvis from '@tensorflow/tfjs-vis';// 数据可视化工具 vis visualiation 可视化
// 1: 数据 这里的x y都是一一线性相关的
//x y 横纵坐标分开 是为了给模型的时候告诉模型 一个是input 一个是output
//都要给模型学习的 x-》y是什么 一组一组；来学
const xs = [1, 2, 3, 4];  // input  [i1.png, i2.png, i3.png] 特征就是我们的输入
const yx = [1, 3, 5, 7];  // input output [yes,       n,        y  ] 标签

window.onload = async () => {
tfvis.render.scatterplot(  //渲染一个图，一个散点图
  //每一个参数都是一个对象
  {
    name: '数据集',
  },
  {
    //values是一个数组 一个嵌套的数组 x坐标 y坐标嵌套出来的数组
    values: xs.map((x, i) => {
      return {
        x,
        y: yx[i]
      }
      // [{x: 1, y: 1}, {x: 2, y: 3}]
    })
  }
)
//模型
const model = tf.sequential();
  // 单层单个 神经元
  model.add(tf.layers.dense({
    units: 1,  //神经元只有一个
    inputShape: 1  //这层接收到的输入 是一个数据
  }))
  //机器学习
  //给了数据给机器后 机器先猜 y是什么，再用损失函数看
  // 损失函数 告诉错了 错得有多离谱 然后去调整-》预测函数-》计算损失-》经过指定轮数
  // MSD 均方误差
  // optimizer: 优化器-》怎么调整，调整多少
  model.compile({
    loss: tf.losses.meanSquaredError, //损失函数
    optimizer: tf.train.sgd(0.1)  //学习速率 每次调整的值
  })
  // 数据转换一下 把数组成tensor 因为都是tensor的数据
  const input = tf.tensor(xs), labels = tf.tensor(yx);
  // 开始让机器学习 fit
  // batchSize: 每一批数据的大小 就是机器每次学习多少
  // epochs: 学习多少轮
  // 超参数：动态调整 不是死的
  await model.fit(input, labels, {  //把x y这两项数据告诉机器 让他去学习
    batchSize: 4,  //有4组
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks( //学完的过程用tfvis可视化出来看一下
      { name: '训练过程'}, 
      ['loss']   // loss损失（预测值与实际值差多少） 我们只看loss指标
    )
  })
  const ouput = model.predict(tf.tensor([5])) //预测x为5时 y是什么
  console.log(ouput.dataSync()); //输出预测的值 转换一下数据格式

}
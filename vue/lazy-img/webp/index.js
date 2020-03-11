// const webp = require('webp-converter');
// webp.cwebp("test.jpg", "test.webp", "-q 80", //cwebp:convert to webp;-q 10:压缩的时候，压缩比例是80%
//  function(status, error) { //是要花时间的，异步
//   console.log(status, error);
// })

// 原图 10% 左右轮廓 ， lazyload 加载完成后 替换上去
// img  src  ->  loading.gif logo 
const lqip = require('lqip'); 
const file = './in.png';
lqip
  .base64(file) //模糊的
  .then(res => {
    console.log(res);
  });
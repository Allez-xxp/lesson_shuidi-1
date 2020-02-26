// // 手动的计算
// console.log('rem');
// 引入一个闭包，传入document 和window
(function(doc, win){
    // 这里定义的不会污染外界 
    // 用来计算html的 fontSize  width/16 栅格 
    var docEl = doc.documentElement, //获取html
    // 是否换了方向，横屏？ 调整窗口宽度->resize事件
      resizeEvt = 'orientationchange' in win ? 'orientationchange': 'resize',
      
      recalc = function() {
        // 设备无差异计算出  16rem = 100% width
        var clientWidth = docEl.clientWidth; //html的整个窗口的宽度
         // console.log(clientWidth);

        if (!clientWidth) return;
        // 设计稿  750-》  375  640-》  320 ；20/320=1/16(20和320由此得出)
        docEl.style.fontSize = 20 * clientWidth/320 + 'px';
        // console.log(clientWidth);
        // ?设备可能由纵向变模着拿 尺寸发生变化
        win.addEventListener(resizeEvt, recalc, false);
      };
    // 从外到内， 从内到外
    // .box   都监听点击事件click  a()先执行    true  由外向内执行; 捕获
    //   .innerBOX  还是b()呢？    false   内层向外层执行;冒泡
    // DOMContentLoaded事件比onload事件先发生，这个只要html结构加载完成就行
    doc.addEventListener('DOMContentLoaded', recalc, false);
    // docEl.style.fontSize = '23.5px';
  })(document, window) // 闭包， 立即执行 这两个是实参
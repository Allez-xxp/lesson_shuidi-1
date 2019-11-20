数据可视化
使用requestionAnimationFrame请求运动帧
游戏开发之中requestAnimationFrame代替setInternal
animation函数中再调用animation()函数 循环调用
function animation(){
    console.log('---汪');
    requestAnimationFrame(function(){//与电脑刷帧频率一致
        animation();//递归算法 自己调用自己 会出现内存泄漏 无法退出 
    })
   
}
animation();//请求运动帧

canvas是画布 画布中有绘制的API 画布的默认大小：
canvas.style.width 标准的 任何一个元素都有的。一定要给单位，因为style中的单位有很多种
canvas.width 设置的是html的属性，不是样式的某个属性，不接受单位，只接受数值。
<canvas id="myCanvas" width="500"height="500"></canvas>
<canvas id="myCanvas" height="500" style="width:100vw;"></canvas>

ctx=canvas.getContext('2d');
ctx.fillStyle='red';
ctx.fillText(2,100,100);
requestAnimation+ctx.fillText(2,100,100);//一直画
requestAnimation+clearRact();//带橡皮

index.html:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    html, body {
    margin: 0;
    overflow: hidden;
    font-family: sans-serif;
    background: #13091B;
    height: 100%;
  }
  body {
    background: url(https://p1.music.126.net/gAmIGjlWnYXE_0O8LFp5-w==/109951164382001054.jpg) no-repeat;
    background-size: cover;
  }
  #canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  audio {
    visibility: hidden;
  }
  #play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #13091B;
    background: #007A99;
    display: block;
    width: 150px;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    letter-spacing: 0.1em;
    z-index: 1;
    text-align: center;
    text-decoration: none;
  }
    </style>
</head>
<body>
    <div id="content">
        <canvas id="canvas"></canvas>
        <!-- <audio src="//m8.music.126.net/21180815163607/04976f67866d4b4d11575ab418904467/ymusic/515a/5508/520b/f0cf47930abbbb0562c9ea61707c4c0b.mp3?infoId=92001" id="audio" autoplay></audio> -->
        <audio src="//m8.music.126.net/21180815163607/04976f67866d4b4d11575ab418904467/ymusic/515a/5508/520b/f0cf47930abbbb0562c9ea61707c4c0b.mp3?infoId=92001" id="audio" crossorigin="anonymous" ></audio>
        <a href="javascript:;"id="play-btn">Play</a>
    </div>
    <script>
    var btn=document.getElementById('play-btn');
    var audio=document.getElementById('audio');
    btn.addEventListener('click',function(){
        btn.style.display='none';
        audio.play();
        onLoadAudio();
    });
    function onLoadAudio(){
        var canvas=document.getElementById('canvas');
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

        var ctx=canvas.getContext('2d');
        var WIDTH=canvas.width;
        var HEIGHT=canvas.height;
        //音量输入，量化的
        // var audioCtx=new window.AudioContext();
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        //创建分析器对音乐作分析，分析强度512
        var analyser=context.createAnalyser();
        analyser.fftSize=512;
        //audio 歌
        var source=context.createMediaElementSource(audio);
        source.connect(anayser);//连接起来
        
        analyser.connect(audioCtx.destination);//目标是谁,连接分析器

        var bufferLength=analyser.frequencyBinCount;//频繁度
        var dataArray=new Uint8Array(bufferLength);//创建8位的二进制数组 有bufferLength这么多
        console.log(dataArray);

        var barWidth=WIDTH/bufferLength*1.5;
        var barHeight;//高度不变
        function renderFrame(){
            requestAnimationFrame(function(){
                renderFrame();
                // console.log('----');//测试运动帧是否添加成功
                analyser.getByteFrequencyData(dataArray);
                // console.log(dataArray);
                for(var i=0,x=0;i<bufferLength;i++)
                {
                    barHeight=dataArray[i];
                    ctx.fillStyle="rgba(255,0,0)";
                    ctx.fillRect(x,HEIGHT-barHeight,barWidth,barHeight);
                    x +=barWidth+2;
                    
                }
            })
        }
        renderFrame();
    }
    </script>
</body>
</html>
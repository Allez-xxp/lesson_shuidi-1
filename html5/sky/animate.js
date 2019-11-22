    // 2改：流程式的代码不适合复用 要封装
    // Animation类
    // var Animation=function(els){
    //     // els参数
    //     var dur=0.3,//花0.3秒做运动
    //     amount="55%",//运动量
    //     tl=new TimelineMax({
    //         repeat:-1,
    //         yoyo:true,
    //         repeatDelay:1
    //     });//逗号分开一次定义了三个分量
    //     tl.add(
    //         formLeft(
    //             [els[0],els[2]]
    //             )
    //         )
    //        .add(
    //            formRight(
    //                els[1]
    //            )
    //        )
    //     //    amount,autoAlpha:0.2透明度0.2
    //     function formLeft(el){
    //         return TweenMax.from(el,dur,{x:'-='+amount,autoAlpha:0.2})
    //     }
    //     function formRight(el){
    //         return TweenMax.from(el,dur,{x:'+='+amount,autoAlpha:0.2})
    //     }
    // }
    

    // 1改：
    // var tl=new TimelineMax({
    //     repeat:-1,//一直动
    //     //repeat :1,动一下
    //     yoyo:true,//像悠悠球一样弹
    //     repeatDelay:1
    // })
    // {/* from从哪开始动 0.3速度 {x:'-=55%'}左移宽度的55% {x:'+=55%'}右移宽度的50% */}
    // tl.from(['#box1,#box3'],0.3,{x:'-=55%'});
    // tl.from(['#box2'],0.3,{x:'+=55%'});

    var Animation=function(opts){
        // els参数
        var dur=0.3,//花0.3秒做运动
        amount="55%",//运动量
        tl=new TimelineMax({
            repeat:-1,
            yoyo:true,
            repeatDelay:1
        });//逗号分开一次定义了三个分量
        tl.add(
            formLeft(
                opts.leftAnimated
                )
            )
           .add(
               formRight(
                opts.rightAnimated
               )
           )
        //    amount,autoAlpha:0.2透明度0.2
        function formLeft(el){
            return TweenMax.from(el,dur,{x:'-='+amount,autoAlpha:0.2})
        }
        function formRight(el){
            return TweenMax.from(el,dur,{x:'+='+amount,autoAlpha:0.2})
        }
    }
  
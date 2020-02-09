// var i=0;

// function timedCount()
// {
//     i=i+1;
//     postMessage(i);
//     setTimeout("timedCount()",500);
// }

// timedCount();
onmessage = function (e) {
    var ary=[]
    for(var i=0;i<e.data;i++){
        ary.push({
            name:'name'+i,
            value:'value'+i
        })
    }
    postMessage(ary)
};

// var worker=new Worker("/demo_workers.js");
        // worker.postMessage(600000);
 
        // worker.onmessage = function (e) {
        //     console.log(e.data)
        // };
        // console.log('外部打印');
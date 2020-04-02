var indexall = function(nums,value) {
    // let index = [];
    // for(let i=0;i<nums.length;i++){
    //     if(nums[i] === value){
    //         index.push(i);
    //     } 
    // }
    // return index;

    // 有问题
    // return nums.map((item,index)=>{
    //     if(item === value){
    //         return index;
    //     } else {

    //         return null;
    //     }
    // });

    let arr= [];
    nums.forEach((item,index) => {
        if(item === value) {
            arr.push(index)
        }
    });
    return arr
}
console.log(indexall([1,2,3,1,1,3],1));
// console.log(indexall([1,2,3],4));
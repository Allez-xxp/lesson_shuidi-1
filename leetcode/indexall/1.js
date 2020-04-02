var indexall = function(nums,value) {
    // for循环：
    // let index = [];
    // for(let i=0;i<nums.length;i++){
    //     if(nums[i] === value){
    //         index.push(i);
    //     } 
    // }
    // return index;

    // map方法:
    // let list = [];
    // //1
    // // nums.map((item,index)=> item ===value && list.push(index));
    // // return list;
    // //2.
    // nums.map((item,index)=>{
    //     if(item===value){
    //         list.push(index);
    //     }        
    // });
    // return list;
    
    //forEach:
    // let arr= [];
    // nums.forEach((item,index) => {
    //     if(item === value) {
    //         arr.push(index)
    //     }
    // });
    // return arr 
    
    //???没出来
    // Array.prototype.findindexall = function (target){
    //     const list = [];
    //     for(let index in nums) {
    //         if(JSON.stringify(nums[index]) === JSON.stringify(target)) {
    //             resizeBy.push(index)
    //         }
    //     }
    //     return list
    // }
    
}



console.log(indexall([1,2,3,1,1,3],1));
// console.log(indexall([1,2,3],4));
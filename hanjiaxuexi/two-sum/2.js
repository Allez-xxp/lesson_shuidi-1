// 有没有可能少一层内层循环？
// for x
//     找y 使 x+y=target
// target-x=y 找nums中有没有符合的y并拿到序号
const twoSum=(nums,target)=>{

    let map=new Map();//改进，用es6

    
    // let map={};//对象自变量
    let res=[];//存下标的数组

    // nums.forEach((e,i) =>map[e]=i);//map
    
    nums.forEach((e,i) =>map.set(e,i));//改进，用es6

    // console.log(map);
    for(let i=0;i<nums.length;i++){

        let j=map.get(target-nums[i]);//改进，用es6

        // let j=map[target-nums[i]];//在json中是属于一个类似hash表的查询，时间复杂度为O(1)
        if(j&&j!==i){
            res=[i,j];
            break;
        }
    }
    return res;
}
console.log(twoSum([2,7,11,15],9));
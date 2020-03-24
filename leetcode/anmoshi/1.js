// 动态规划问题
//定义二维数组
var massage = function(nums) {
    // const Length = nums.length;
    // if(Length <= 1){
    //     return length ===1 ? nums[0] : 0;
    // }
    // // 1.构造二维数组，用于存放每个预约的最大时长
    // let dp = new Array(Length).fill(undefined).map(arr=>[0,0]);
    // dp[0][1] = nums[0];
    // //状态转移方程
    // for( let i = 1; i < Length; i++) {
    //     dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1]);     //第i个，不接受
    //     dp[i][1] = dp[i-1][0]+ nums[i];     //第i个，接受
    // }

    // //最后一次预约可接受可不接受，取最大值
    // return Math.max(dp[Length-1][0], dp[Length-1][1]);

    // // 2.初始化边界值
    // // 3.建立状态转移方程
    // // 4.得出结果

    let len = nums.length;
    if( len<=1 ) {
        return len = len === 1 ? nums[0] : 0
    }
    let dp = [];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0] , nums[1])
    for(let i = 2;i<len;i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i])
    }
    return dp[len-1]

}
// massage[1,2,3,1]
console.log(massage([1,2,3,1]));
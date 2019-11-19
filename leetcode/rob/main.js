var rob=function(nums){
    var dp=[];//js新建数组,动态规划数组 dynamic protocol
    dp[0]=0;//为了使数据可计算
    dp[1]=0;
    for(let i=2;i<nums.length+2;i++){
        dp[i]=Math.max(dp[i-2]+nums[i-2],dp[i-1]);//i位置上的最佳策略,两者之一；i-2是为了好计算。前两个最大的加自己的跟dp[i-1]比较
    }
    console.log(dp);
    return dp[nums.length+1];
}
console.log(rob([2,7,9,3,1]));//2,9,1 共12
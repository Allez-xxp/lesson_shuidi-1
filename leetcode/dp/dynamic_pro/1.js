// 莱温斯坦距离
var a = "mitcmu"; //源字符串
var b = "mtacnu"; //要去比较的字符串
var n = 6, m = 6; //字符串的长度
var minDist = Infinity;//最短距离 动态规划 回溯算法（是基于递归结构形成的）
// 正向无穷大（因为要求最小的） 求最大的就改成负向无穷大
// 回溯算法 递归是解决问题的一种特殊的结构，回溯算法是利用递归结构
// 核心思维，递归 + 穷举
function lwstBT(i, j, edist) {
    // 退出条件
    if (i == n || j == m) { //任意一个到头了
        if (i < n) edist += (n - i); //后面的就删掉，删一个加一步
        if (j < m) edist += (m - j);
        if (edist < minDist) minDist = edist
        return;
    }
    if(a[i] == b[j]) {
        //两个位置地字符一样 为0 不影响距离，做下一个位置地计算
        lwstBT(i + 1, j + 1, edist) //递归
    } else {
        // 把所有可能都列一遍
        // i ，j中，可能有多种决策需要做，
        lwstBT(i + 1, j, edist + 1); //就把i忽略掉
        // 可能i位置上的值被删除，可能
        // 回溯算法，要尝试多少种可能性？
        lwstBT(i, j + 1, edist + 1);
        lwstBT(i + 1, j + 1, edist + 1);
    }
}
//初始
lwstBT(0, 0, 0) 


console.log(minDist);
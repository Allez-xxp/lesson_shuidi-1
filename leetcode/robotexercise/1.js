var movingCount = function(m, n, k) {
    let result = 0; //记录最后的格子数
    //方向，从[0,0]开始，那方向就是向右或向下两方向
    const dir = [[1,0], [0,1]];
    //利用广度优先（BFS），需要利用队列的方式
    //初始化第一步的位置和是否走过的Boolean值
    const queue = [[0,0]]; //从左上角开始搜索
    //用一个Boolean表示格子是不是走过了
    const visited = {
        "0-0": true
    }
    //开始搜索
    while(queue.length) {
        //根据BFS原理，搜索邻接表时，搜谁的，谁就先出栈,并且是从栈顶开始出栈，所以用shift
        const [x, y] = queue.shift();
        //走的格子要满足题目要求，小于k
        if(weiSum(x) + weiSum(y) > k) {
            continue;
        }
        //else 的话 res就加一
        result++;
        //然后更新坐标
        for(let r of dir) {
            const rx = r[0] + x; //x轴方向
            const ry = r[1] + y; //y轴方向
            if(!visited[`${rx}-${ry}`] && rx >= 0 && ry >= 0 && rx < m && ry < n) {
                //没走过的格子
                queue.push([rx, ry]);
                visited[`${rx}-${ry}`] = true;
            }
        }
    }
    return result;
};
//求位数之和
function weiSum(n) {
    let res = 0; //记录最后的值
    while(n) {
        res = res + n%10; //不断求每次的个位（用求余的方式得到个位）
        n = Math.floor(n/10); //向下求正的方式 小数点不断往前移，让上面的res能够准确的加到的是每一位上的位数
        //比如98 ：98%10=8 ；98/10=9;再循环 res = res +9%10=8 + 9; n=9/10=0退出循环
    }
    return res;
}
console.log(movingCount(2, 3, 1));
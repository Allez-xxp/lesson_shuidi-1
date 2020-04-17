var ksum = function(data, n, sum){
    let list = []; //放合适的结果
    backtrack(data, list, n, sum)
    return list;
}
//回溯
//还得有一个起始点，每次选择的起始点
function backtrack(data, list, n, sum, tempList = [], start = 0) {
    if(tempList.length === n) {
        //n个数了，怎么到达sum的条件呢？
        //用reduce求个和 先给个默认值0
        if(tempList.reduce((a, b) => a + b, 0) === sum) {
            //找到了,把当前的选择push进去
            list.push(tempList);
            //满不满足，都要回到上一步，就是递归的地方 for循环中，做下一步选择
        }
        return; //让我们能回到上一步，递归的归，回到上一步说明没选，那就要删掉
    }
    //for是用来枚举出每一步可选的列表
    for(let i = start; i < data.length; i++) {
        //数组的每一项都做一个选择
        //定义一个数组，记录到目前为止做的选择tempList
        tempList.push(data[i]); //第一步，数组中的每个都会做一个选择
        //第二步，把上次做的选择存下来 之后的步骤
        backtrack(data, list, n, sum, tempList.slice(0), i + 1) //告诉下一步的起始点
        //递归什么时候到头？就是选择已经够三个数了，在外面再套一层
        //没选就删掉，撤销上一步的选择
        tempList.pop(); //回到上一步的时候，撤销刚才的选择
        // 致命问题：tempList是一个引用类型，操作的都是同一个数，最后push pop返回的是个空
        //所以将tempList告诉下一个时，先做一个浅复制slice(0)
        //backtrack是一步步的往下选，每次递归选的时候，发现满足个数时，终止选择的步数，return回到上一步

        //一条枝走完后，pop了两次到第二层
        // 循环里pop一次，退出递归pop一次
        // 循环完毕pop一次，递归中止时候一定 回到上一步递归的时候 pop一次


    }
}
//[1,2,3,4,5,7] n=3,sum=10
console.log(ksum([1,2,3,4,5,7], 3, 10));

/**
 * //回溯基本模板
 * backtrack() {
 * //递归的终止条件
 * if() {
 * //终止条件
 * }
 * for{
 *  //做出选择
 * backtrack
 * //回到上一个选择，撤销选择
 * }}
 */
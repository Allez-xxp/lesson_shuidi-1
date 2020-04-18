var maxArea = function(height) {
    // let max = 0;
    // for(let i = 0; i<height.length-1; i++) {
    //     for(let j = i+1; j < height.length; j++) {
    //         max = Math.max(max, Math.min(height[i] , height[j]) * Math.abs(i - j));
    //         // console.log(max);
    //     }
    // }
    // return max;

    // 双指针

    let i = 0, j = height.length - 1, max = 0;
    while(i < j) {
        if(height[i] < height[j]) {
            let temp = (j - i) * height[i]
            max = Math.max(max, temp)
            i++;
        }else {
            let temp = (j - i) * height[j]
            max = Math.max(max, temp)
            j--
        }
    }
    return max;
};
console.log(maxArea([1,8,6,2,5,4,8,3,7])); //49




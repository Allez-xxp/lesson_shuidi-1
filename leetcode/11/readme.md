11. 盛最多水的容器
链接：https://leetcode-cn.com/problems/container-with-most-water

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。6                                                                                                    
```js
var getTriggerTime = function(increase, requirements) {
	const MAX = 200000;
	let c = [0], r = [0], h = [0];
	for (const inc of increase) {
		c.push(c[c.length - 1] + inc[0]);
		r.push(r[r.length - 1] + inc[1]);
		h.push(h[h.length - 1] + inc[2]);
	}

	const max = (a, b, c) => Math.max(a, Math.max(b, c));
	const bisearch = (arr, value) => {
		if (value > arr[arr.length - 1]) return MAX;
		let l = 0, r = arr.length - 1;
		while (l < r) {
			const m = (l + r) >> 1;
			if (arr[m] < value) l = m + 1;
			else r = m;
		}
		return l;
	};

	return requirements.map(req => {
		const t = max(
			bisearch(c, req[0]), 
			bisearch(r, req[1]), 
			bisearch(h, req[2])
		);
		return t === MAX ? -1 : t;
	});
};
```

```js
/**
 * @param {number[]} jump
 * @return {number}
 */
var minJump = function(jump) {
    let maxL = 0;
    const a = new Array(jump.length).fill(0);
    let r = [ 0 ];
    a[0] = 1;
    let l = 0;
    while (l < r.length) {
        if (r[l] > maxL) {
            for (let i = maxL + 1; i < r[l]; i++ ) {
                if (!a[i]) {
                    a[i]  = a[r[l]] + 1;
                    r.push(i);
                }
            }
            maxL = r[l];
        }
        if (r[l] + jump[r[l]] >= jump.length) {
            return a[r[l]];
        }
        if (!a[r[l] + jump[r[l]]]) {
            a[r[l] + jump[r[l]]]  = a[r[l]] + 1;
            r.push(r[l] + jump[r[l]]);
        }
        l++;
    }
};
```

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimalExecTime = function(root) {
    if (!root) return null;
    const left = minimalExecTime(root.left);
    const right = minimalExecTime(root.right);
    var getSum = function(r) {
        if (!r) return 0;
        return getSum(r.left) + getSum(r.right) + r.val;
    }
    return Math.max(left, right, (getSum(root.left) + getSum(root.right)) / 2) + root.val;
};
```
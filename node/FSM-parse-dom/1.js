function match(string) {
    for(let c of string) {  //of是找value,in是找key
        if(c === 'a') return true;
    }
    return false;
}
//如果是查找"ab"在不在一个字符中呢？
// 是一个连续的，那就是要先找到a,然后才能找b
function matchAb(string) {
    // 有没有找到a,用一个Boolean来记录
    let foundA = false;
    // 有问题，因为没有确保是连续的 acb会被认为是true,
    for(let c of string) {
        if(c === 'a') {
            foundA = true;
        } else if(foundA && c === 'b') {
            return true;
        } else {
            // 这里要重新开始匹配ab,是一次全新的，上面那个a已经失效了
            foundA = false
        }
    }
    return false;
}
// console.log(matchAb('acb'));
// 上面就是一个简版的状态机
// 再复杂点
// 找abcdef
function matchAbcdef(string) {
    // 有没有找到a,用一个Boolean来记录
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    // 有问题，因为没有确保是连续的 acb会被认为是true,
    for(let c of string) {
        if(c === 'a') {
            foundA = true;
        } else if(foundA && c === 'b') {
            foundB = true;
        } else if(foundB && c === 'c') {
            foundC = true;
        } else if(foundC && c === 'd') {
            foundD = true;
        } else if(foundD && c === 'e') {
            foundE = true;
        } else if(foundE && c === 'f') {
            return true;
        } else {
            // 一步不符合就重新开始
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}
// 代码比较难以维护
// 改一下
// 有单独的自己的状态
function newMatch(string) {
    let state = foundA; //state是foundA的初始状态
    for(let c of string) {
        state = state(c)
    }
    return state === end
}
function foundA(c) {
    if (c === 'a') {
        // 匹配上了，告诉他下一个状态是什么
        return foundB;
    } else {
        // 不等于直接去到起点
        return foundA; //注意，这不是递归，不是自己调用了自己
    }
}
function foundB(c) {
    if (c === 'b') {
        return foundC;
    } else {
        // 不等于直接去到起点
        return foundA;
    }
}
function foundC(c) {
    if (c === 'c') {
        return end; //不用ture
    } else {
        // 不等于直接去到起点
        return foundA;
    }
}
//习惯上会给一个end
function end() {
    return end; //找到最终的结果的状态叫end
}
console.log(newMatch('abcdef'))
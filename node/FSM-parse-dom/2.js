// 词法分析
let htmlStr = `<html>
<head></head>
<body>
    <div></div>
</body>
</html>
`;
// 浏览器是分段的接受到信息的，状态机不管别的，只要接受的顺序对了，就可以，不管中间是不是分段接收到的
// 词法分析 分词
// 分出来{type:element, tagName: 'html', tag: 'startTag'} 一棵dom树上的节点是有类型的
// 分出来{type:element, tagName: 'html', tag: 'endTag'} 一棵dom树上的节点是有类型的

//用栈配对
let stack = [
    { type: 'document', children: []} //type是结点的类型，//根节点
]
// 当前正在处理的html标签
let curentToken = null; 
function parse(string) {
    let state = start; //交给状态机开始处理
    for(let c of string) {
        state = state(c); //让它接受到字符c
    }
    // 注意，状态机一定要告诉他下一个状态是什么，没有的话会报错
    // state是处理完当前字符后，有上一个状态告诉下一步状态是什么
}
parse(htmlStr);
// 遇到一个小于号，说明后面是一个标签，
// 后面要么是标签名，要么是/
// 这里还要处理回车 空格符
function start(c) {
    if(c === '<') {
        return tagOpen; //改变状态，这个是标签的开始
        // 不是的话，也要告诉下一步的状态是什么
    } else {
        return start; //直接忽略，跳到下一个状态，这里也不是递归，start()这样才是
    }
    
}
function tagOpen(c) {
    if(c === '/') {
        // 必然是一个结束标签
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        // 必然是一个开始标签
        // 去拼接，进行tagName的处理
        curentToken = {
            type: 'element',
            tag: 'startTag',
            tagName: c //就是标签名，因为是一个一个字符组成的，所以应该说是标签名的一个组成部分
        }
        return tagName;
    }
}
function tagName(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        // 拼接tagName
        curentToken.tagName +=c;
        // 这里拼接完后要告诉他下一个状态是什么
        return tagName; //没拼完是要继续拼接的，循环拼接
        // 什么时候拼接完，遇到大括号
    } else if(c === '>') {
        // 拼完了，提交当前token
        emit(curentToken);
        // 提交完后也要告诉下一步状态是什么
        return start; 
        // 重置，重新处理一个新的token,>的下一个字符是啥是回车和空格
    }
}
function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        curentToken = {
            type: 'element',
            tag: 'endTag',
            tagName: c //就是标签名，因为是一个一个字符组成的，所以应该说是标签名的一个组成部分
        }
        // 剩下的也要拼接，开始标签也是，也要拼接
        // 用现成的拼接,循环拼接tagName这里
        return tagName;
    }
    
}
// let stack = [
//     { type: 'document', children: []} //type是结点的类型，//根节点
// ]
//看一下栈中有什么内容
// 用两个空格格式化一下
console.log(JSON.stringify(stack, null, 2));
function emit(token) {
    // console.log(token);
    // 我们提交进来的token其实都是document的子元素
    // 两两匹配
    let top = stack[stack.length - 1];
    if(token.tag === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attribute: [],
            tagName: token.tagName
        }
        // 子节点都是它的children
        // 当前的element一定是栈顶的子元素
        top.children.push(element);
        stack.push(element)
    } else if(token.tag === 'endTag') {
        // 和栈顶元素进行比较
        if (top.tagName === token.tagName) {
            stack.pop()
        } else {
            throw new Error('no match');
        }
    }
}
// 看一下token能不能提交进来
// 发现提交完html后就报错了，什么时候提交完的，处理到>的时候，没有说下一步是什么
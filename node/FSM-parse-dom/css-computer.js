// 词法分析
let htmlStr = `<html>
<head>
    <style>
    body div myid {
        width: 100px;
        backage-color: #fff;
    }
    </style>
</head>
<body>
    <div>
        123
        <div id="myid">
            <span name="myspan"></span>     
        </div>
    </div>
</body>
</html>
`;
// 还需要一个状态，img这种 自闭合的
// 选择器 浏览器解析选择器，我们这里只写标签，类，属性选择器
// 要让myid这个元素，这个节点上该有的css附加到DOM中去
// 要拿到css内容 分析选择器 与id对应起来
// 要先拿到里面的内容


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
// 用全局
let currentTextNode = null;
let currentAttribute = null;
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
        // 文本内容 文本标签也是作为别人的子元素
        // 开始标签一直在栈顶，父节点就是我们的栈顶元素
        emit({
            type: 'text',
            content: c //谁的子元素
        })
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
            attribute: [], //别忘了
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
    } else if (c.match(/^[\n\f\t ]$/)) {
        // 匹配属性名
        return beforeAttribute
    }
}
function beforeAttribute(c) {
    if (c.match(/^[\n\f\t ]$/)) {
        return beforeAttribute;
        // 还是空格就一直跳
    } else if(c.match(/^[a-zA-Z]$/)) {
        // 遇到属性的内容了，就开始内容的拼接
        // 建一个全局的变量，
        currentAttribute = {
            name: c,
            value: '' //先空着，之后再拼接
        }
        return attributeName; //拼接
    }
    // 还有大括号没能处理到
    else if(c === '>') {
        // 提交
        emit(curentToken);
        return start; //然后重新处理下一个标签
    }
}
function attributeName(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        currentAttribute.name += c;
        return attributeName;
    } else if(c === '=') {
        return attributeValue
    }

}
// 属性值得拼接
function attributeValue(c) {
    if(c ==='\"' || c === '\"') {
        // 不做处理的会把他们丢掉
        return attributeValue;
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentAttribute.value += c;
        return attributeValue;
    } else {
        // 但是这个不能扔，不能把他扔了
        // 属性追加到当前元素上去
        // curentToken是个标签或节点
        curentToken.attribute.push(currentAttribute);
        // 处理完置空
        currentAttribute = null;
        // 然后后面还有属性得话就是要循环处理
        return beforeAttribute(c);//不能能丢了

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
            attribute: token.attribute,
            tagName: token.tagName
        }
        // 子节点都是它的children
        // 当前的element一定是栈顶的子元素
        top.children.push(element);
        stack.push(element)
        // 凡是遇到新的标签都要置为null
        currentTextNode = null;

    } else if(token.tag === 'endTag') {
        // 和栈顶元素进行比较
        if (top.tagName === token.tagName) {
            stack.pop()
            // 还需要置空
            currentTextNode = null;
        } else {
            throw new Error('no match');
        }
    } else if(token.type === 'text') {
        // 作为子节点push进去,push一个完整的文本节点，空的全局变量
        if(currentTextNode === null) {
            currentTextNode ={
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
    // 是一个个单纯的字符，要先拼接
}
// 看一下token能不能提交进来
// 发现提交完html后就报错了，什么时候提交完的，处理到>的时候，没有说下一步是什么
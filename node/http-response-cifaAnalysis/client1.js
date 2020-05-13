// node中也有发请求的需求的 http中有发请求的方法的
// node中也封装了的
const http = require('http');
// 都是node设计好的api request
http.request({
    headers:{},
    url:{}
})

// net模块
// TCP传输是面向字节流的 net是创建TCP链接的一个方法 http就是用net创建的
// 用更原始的
// 发起请求
const net = require('net');
const fs = require('fs');
// TCP是面向连接的
const client = net.createConnection({
    // 默认是localhost,所以不用指定post
    port: 8088
},() =>{
    // 拼报文 write也是基于node进行的一个封装 发送报文
    // 中间有一个/当前的路经 HTTP要大写记得
    client.write('POST / HTTP/1.1\r\n'); //请求行
    // 因为是两端在进行的
    client.write('HOST: 127.0.0.1\r\n');
    client.write('Content-Length: 7\r\n'); //响应头 长度为7
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');// 传过去的编码类型 //这个编码是哪里来的？ index.html form表单上有一个编码，把url以&拼接的格式
    client.write('\r\n')//换行
    client.write('abc=456')//实体
    // client.write('\r\n')//换行
    
    // 以TCP形式传给后端，请求报文，然后后端也传一个响应报文，格式其中请求行（状态行）是不一样的
})
//响应报文 这个也是分段的，
// 不过这里的分段不是http中的分段，意义不一样，这里是node中流的一个分段，http中是tranfer-encoding 的一个分段chunk；
// 我们不是一次性拿到所有报文的
// let parser = new ResponseParser();
// client.on('data', (data) => {
//     // console.log('data');
//     // 定义一个receive拿到报文的一小段
//     parser.receive(data.toString()) //拿到纯文本内容
// })
// client.on('end', (data) => {
//     console.log('disconnect');
// })

// 要把拿到的纯文本内容解析出来，每部分每部分把他分开，怎么做？
// 1.正则，但是大部分我们用的是状态机

// 做一个响应的解析器

class ResponseParser {
    // 状态
    constructor() {
        this.WAIT_STATUS_LINE = 0; //第一个字符一定是这个状态 ，假设令他为0
        this.currentState = this.WAIT_STATUS_LINE;
        this.WAIT_STATUS_LINE_END = 1;
        this.WAIT_HEADER_NAME = 2;
        this.WAIT_HEADER_SPACE = 3; //冒号后面是一个空格
        this.WAIT_HEADER_VALUE = 3;
        // 每条都拼完了，就是end了
        this.WAIT_HEADER_LINE_END = 4;
        // 头那一块已经接收完毕了
        this.WAIT_HEADER_BLOCK_END = 5; //该退出了 要变更状态

        //处理的时候一定是状态行
        this.statusLine = "";
        this.headerName = "";
        this.headerValue = "";
        this.headers = {} //拼接完了之后放到这个对象中

        // body的拼接
        this.body = "";

    }
    // 接受到的报文,进行解析
    receive(string) { //因为都是文本格式的
        // 一个字符一个字符的处理，这样就能拿到每个字符，从第一个到最后一个
        // 整个报文
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string[i]);
        }
    }
    // 单个字符
    receiveChar(char) {
        if(this.currentState === this.WAIT_STATUS_LINE) { //属于这个状态的时候才是状态行
            // 正在接受，默认第一个状态 字符 一定属于状态行
            // 拼字符 遇到\r意味着状态行处理完毕了

            // 状态的变更
            if(char === '\r') { //这个是在等待结束，遇到\n才是真正的结束
                // 去到下一个状态
                this.currentState = this.WAIT_STATUS_LINE_END;
            } else {
                this.statusLine += char;                
            }
        } else if(this.currentState === this.WAIT_STATUS_LINE_END) {
            // 否则 就是下一个状态 头部
            if(char === '\n') {  //下一个key-value形式的
                // 首行接受完毕，跳到下一个状态,需要拼接
                this.currentState = this.WAIT_HEADER_NAME;
            } //header是有多个的 循环接受，只要修改状态就行
        } else if(this.currentState === this.WAIT_HEADER_NAME) { //============================
            //拼接头部 key-value形式
            if(char === ':') {
                // 去下一个状态
                this.currentState = this.WAIT_HEADER_SPACE
            } else if(char === '\r') { //不能再循环了，要去请求体
                this.currentState = this.WAIT_HEADER_BLOCK_END //header接收完了，要接受body了
            }
            else {
                // 拼接头部
                this.headerName +=char;
            }
        } else if(this.currentState === this.WAIT_HEADER_SPACE) {
            // 下一个状态 等待接受value
            if(char === " ") {
                this.currentState = this.WAIT_HEADER_VALUE;
            }
        } else if(this.currentState === this.WAIT_HEADER_VALUE) {
            // 拼接headvalue
            // 遇到\r就不能再拼接了
            // header是key-value形式的，分别接收完了之后要拼接起来
            if( char === '\r') {
                this.headers[this.headerName] = this.headerValue;
                // 当前这对键值对拼完了，置空
                this.headerName = ''
                this.headerValue = ''
                // 到下一个状态
                this.currentState = this.WAIT_HEADER_LINE_END;
            } else {
                this.headerValue += char;
            }
        } else if(this.currentState === this.WAIT_HEADER_LINE_END) {
            // 循环处理
            // 但是也不是永不停止的，是由一个处理完的时机的，有循环退出条件: 处于name的时候又有\r
            if(char === '\n') {
                // 又处理完一个键值对，然后又处理下一个
                this.currentState = this.WAIT_HEADER_NAME
            }
        } else if(this.currentState === this.WAIT_HEADER_BLOCK_END) {
            // 直接输出一下
            console.log(JSON.stringify()) //输出的是char,要嫩刚看到，要json化一下,能让我们看到\r\n这个内容7
        }
        // 然后是下一个键值对的拼接
        // 怎么让字符做拼接？
        // 循环处理，又回到header-name的处理
        // 循环处理的一个逻辑过程
    }
}

// 实例化一下
let parser = new ResponseParser();
client.on('data', (data) => {
    // console.log('data');
    // 定义一个receive拿到报文的一小段
    parser.receive(data.toString()) //拿到纯文本内容
})
client.on('end', (data) => {
    console.log('disconnect');
})

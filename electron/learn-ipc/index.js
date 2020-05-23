const { app, BrowserWindow, ipcMain } = require('electron');
// 后端应用：app；要打开的窗口；
// ipcMain ipcRenderer
const path = require('path')

// 这是我们的窗口单例，窗口中还能嵌套窗口
let win

// 启动我们的项目
const createWindow = () => {
    //创建窗口
    win = new BrowserWindow({
        width: 960,
        height: 600,
        minWidth: 830,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true //把node植入进去，就能用require了
        }
    })
    // 让它加载
    // 运行在node环境中。使用file的双斜杠协议
    win.loadURL(`file://${__dirname}/index.html`)
    // loadFile也可以，loadURL给他传的是file协议，URL传的是http协议，他都可以通过协议加载相应的文件
}
ipcMain.on('greet', (event, args) => {
    // 时间名如果是greet的时候,
    console.log(args);
    // 事件对象event
    // 找到谁发给我的，然后再发送一个东西过去
    event.sender.send('greet', {
        message: 'hi renderer ~'
    })
})

// 监听。打开它，ready的时候
app.on('ready', createWindow)
let { app, BrowserWindow }= require('electron'); //把electron引入进来 在node端运行
let win
app.on('ready', () => {
    win = new BrowserWindow(
        {
            width:600, //窗口的宽度
            height:300,
            webPreferences: {
                nodeIntegration:true //支持node调试
            }
        }
    ) //chromium 就启动了 桌面的代表就是窗口
    win.loadURL("http://localhost:3000"); //有了这个可以在桌面的窗口把这个应用放进去//记得大写
})
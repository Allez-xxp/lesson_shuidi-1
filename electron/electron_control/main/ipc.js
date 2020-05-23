// 封装的一个，renderer叫他做事情
const { ipcMain, clipboard } =  require('electron');
// clipboard 右键，复制等功能都能做 客户端功能 剪贴板功能
module.exports = function() {
    // 要来调用的时候
    ipcMain.handle('login', async() => {
        // 生成随机数，发动操作码
        let code = Math.floor(Math.random()*(999999- 100000)) + 100000
        return code;
    })
    // 为什么回想跑马灯一样一直闪？？

    // 监听一个来自renderer的自定义事件
    // e就是event,code就是要传过来的args
    ipcMain.on('share-to-wechat', async(e, code) => {
        if(code) {
            // console.log(code);
            // 向剪贴板中剪贴文本
            clipboard.writeText(code.toString())
        }
    })
}
// 然后从其一下 npm run start:main
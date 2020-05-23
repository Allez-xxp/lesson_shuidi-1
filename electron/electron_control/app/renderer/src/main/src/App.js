import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// electron调用nativeAPI chromium有解析js的能力
// ipc进程间通信inter-process communication进程间通信 
// 为什么这里会有进程间通信？
// 远程的一个remote
import { ipcRenderer,remote } from 'electron'; //通过它可以去到别的地方 进程间通信
const { Menu, MenuItem} = remote; //这里面有我们native的api
// 不同的地方menu不一样，用Menu去手工设置右键会弹出什么菜单

function App() {
  const [localCode, setLocalCode] = useState('');//向renderer发送控制码
  const [controlText, setControlText] = useState('');
  const login = async () => {
    // 等待ipcRenderer回复 invoke
    let code = await ipcRenderer.invoke('login');
    setLocalCode(code)
  }
  // 为什么回想跑马灯一样一直闪？？


  // 用useEffect，就不用把App这个组件变成一个类了 componentDidMount
  useEffect(() => {
    // 向外面发出一个复制的
    login();
  },[]); 
  //这里要加第二个参数！！
  const handleContextMenu= (e) => {
    e.preventDefault(); //阻止默认行为
    const menu = new Menu();
    //添加菜单项
    menu.append(new MenuItem({
      label: '复制',
      role: 'copy'
    })) 
    menu.append(new MenuItem({
      label: '分享到微信',
      // 当前点击的是谁win  有没有同时按下键
      click: (MenuItem, win, keyboardEvent) => {
        ipcRenderer.send('share-to-wechat', '123123') //剪贴板中有了这个后面的内容
      }
    })) 
    //挂载上去，popup弹出来
    menu.popup()
    // 去试试 右键有了！
  };
  return (
    // <div className="App">
    //   {/* onContextMenu是react中的事件，当按右键的时候 事件监听 h5中的*/}
    //   <h1 onContextMenu={(e) => handleContextMenu(e)}>hai</h1>
    // </div>
    <div className="App">
      {
        controlText === ''?<>
          <div>你的控制码</div>
          {/* 从ipcMain发送过来，通过useEffect发送，用login 去外面请求，得到localCode */}
          <span>{localCode}</span>
        </>:
        <div>{controlText}</div>
      }
    </div>
  )
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
// electron调用nativeAPI chromium有解析js的能力
// ipc进程间通信inter-process communication进程间通信 
// 为什么这里会有进程间通信？
import { ipcRenderer } from 'electron'; //通过它可以去到别的地方 进程间通信

function App() {
  return (
    <div className="App">
      你好
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
// 引进来自己的concurrentDemo
import ConcurrentDemo from './ConcurrentDemo'

function App() {
  return (
    <div className="App">
      <ConcurrentDemo />
    </div>
  );
}

export default App;

执行一下 npm install -g create-react-app
create-react-app --version
PS D:\LESSION_SHUIDI\react> create-react-app react-base
 
App.js
// key是用来区分 页面可能会更新，就是说假设三秒后把最后一项删掉了
// 是否要把前面没变更的重新销毁再重新渲染呢？用key来区分前后两次的结点可不可以复用（要不要销毁，再重建）
// 两次渲染页面的时候，如果key相同就说明结点时没有变化的，只要做一个移动的操作，不用再重新销毁
key相同会怎么样：报警告 没有了
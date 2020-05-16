{/* <Search onsubmit={ }/> 
// 之实现一个onSubmit */}

// 写react组件 一定要的
import React, { Component } from 'react';
 //组件中不用引入ReactDOM

//新建一个组件
class Search extends Component {
   state = {
    content: '' //表单中输入框的值，
   }
    //箭头函数，减少this带来的困扰
   handleChange = (e) => { //控制表单中的内容
       this.setState({
           content: e.target.value //因为这里能取到事件对象
       })
   }
    // keyup会得到一个事件e
   handleKeyUp = (e) => {
       const { content} = this.state; //输入框中有内容
       if(e.keyCode === 13 && content) { //并且按了回车，才会触发传进来的props
           this.props.onSubmit(content); //提交后要告诉外面 //onSubmit在表单确认的时候提交时触发
            // 提交完了，要把已经搜过的清空，清空上次搜索的值
            this.setState({ content: ''})
       }
   }
   render() {
    // search是一个输入框，render的就一定是一个输入框
    // 实际表单元素有：
    // 受控组件 input内容受当前组件的状态控制,state值变了，input中value才会改变
    // 非受控组件
    // 一定记得加return
    return (
        <input type="text" value={this.state.content} //受控组件
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}/>
        // handleChange定义成箭头函数，减少this的困扰
        // 当点击回车
    ) 
   }
}


// 要记得抛出去
export default Search;
// 测试一下这个组件
// 之前测试的是原生js，就跟组件不一样，这个跟浏览器的页面有关
// 测试一个组件要让他渲染一下才知道结果对不对
// 而且js没有涉及浏览器的onChange 事件
// 组件dom相关的测试，还需要引入一个第三方库，他会帮我们渲染页面，触发事件
// 要一个插件 触发事件的
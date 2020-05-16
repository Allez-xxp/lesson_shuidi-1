import React from 'react';
// 专门用来测试的库
import Enzyme,{mount,shallow} from 'enzyme';
// shallow,mount都是组件挂载的一个方法 返回一个对象，上面
import Adapter from 'enzyme-adapter-react-16';
// 要指明适配器是谁
Enzyme.configure({
    adapter: new Adapter()
})
// 要测试的组件
import Search from './Search'

// 是一个测试集，里面装着一个个的it jest里面也是叫it
describe('测试 Search', () => {
    // 测试集
    // 首先组件渲染的时候最起码不报错,先不测试功能，最起码要能渲染出来 shallaw
    it('normal render', () => {
        // 开始挂载
        let wrap = mount(<Search onSubmit={()=>{}} />)
        // 测试一个方法又没有报错:
        // mocha是should
        // jest是except
        expect(() => {
            wrap.setProps({}); //给组件设置props 目前没有//prop更新，就会引起组建的更新，组件更新了，然后卸载
            wrap.unmount(); //卸载组件
        }).not.toThrow(); //不抛错，测试组件运行的时候是不是不报错
        // 期望的就是这个流程不报错
    })
    // jest中有一个方法，测试会不会报错的

    // 必须组件挂载成功
    it('container input ele', () => {
        let wrap = mount(<Search onSubmit={()=>{}} />) 
        // 一个enzyme的api 浅挂载和深挂载 Full Dom Render
        // 查找 find返回查找的对象
        let len = wrap.find('input').length;
        expect(len).toBe(1); //断言一下，只有一个input框
    })
    // 输入内容的时候，触发onChange的时候，里面的内容跟着输入了什么而变化
    // 事件的处理
    it('input change', () => {
        // 测试之前都要先挂载
        let wrap = mount(<Search onSubmit={()=>{}} />) 
        // 有一个方法
        wrap.setState({ content: ''}) //限置空
        //然后input框中输入内容
        // 先找到input框
        let input = wrap.find('input')
        // 然后在上面模拟一个change事件，传一个参数 target
        // content: e.target.value //因为这里能取到事件对象
        // 所以模拟的对象也要有这个对象
        input.simulate('change', {
            target: {
                value: 'hhh'
            }
        })
        // 取statestate
        expect(wrap.state().content).toBe('hhh')
    })
    // keyUp事件
    // 可以模拟这个事件，并且，回车的时候期望submit这个方法被调用
    it('test onSubmit callback', () => {
        // 要看一个方法有没有被调用 jest提供了一个方法，可以模拟一个函数
        let fn = jest.fn(); //必须用jest模拟出来
        // 不模拟
        // let fn = (content) => { //会接受一个提交的内容

        // }
        // 给谁模拟事件，要找到模拟的事件
        let wrap = mount(<Search onSubmit={fn} />) //当onSubmit这个回调被调用的时候，传了content参数

        // 2塞内容
        wrap.setState({ content: 'hhh'})
        // 1传给一个事件它的事件对象
        let input = wrap.find('input')

        input.simulate('keyUp', {
            keyCode: 13
        })
        // 还要判断content，也就是在进行回调事件前要在输入框中放东西setState
        // expect(fn).toHaveBeenCalled(); //可以被调用
        // 看有没有被调用有一个方法
        // 还要能传一个参数进来
        expect(fn).toHaveBeenCalled(); //可以被调用
        expect(fn).toHaveBeenCalledWith('hhh'); //必须有参数
    })
})

// npx jest test测试
// npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具 Mocha。


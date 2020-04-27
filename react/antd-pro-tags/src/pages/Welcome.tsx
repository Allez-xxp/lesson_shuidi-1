import React, { useState,useEffect } from 'react'; //使用一下react hooks(useStste)

//默认他选用的是typescript umi默认安装了@types/react,所以有React.FC
// FC=function component
// <>泛型 里面的是props的类型 一般我们写一个json object 一个空的{}
// 1. umi 是阿里的一个开发框架 alley react 开发框架 有点像react的next.js ssr
// page下的Welcome.tsx文件默认会启动/Welcome路由，把这个文件显示出来，他也有路由配置，可以自己配
// 1.要做一个围绕者tags 数组显示的
// 2.这个数组一上来先用useState先定义一下，然后再在return之前使用一个useEffect,去进行请求
// 函数化，更简洁
// 3.ts种要约定类型先，
// const initialTags = [];
//首先他是一个数组类型:后面的是他的类型
import { ITag } from './interface'; //ITag这个类型，把这个文件分离一下,
import { fetchData } from '../utils/fetch'; //9.1在vue中会使用axios 封装fetch请求，便于调试，打log，以及权限的限制
// 5.创建一个接口就可以约束每一个tag里面的每个字段又是什么，严谨性，添加一个接口文件夹，然后再新建一个index.js入口文件

import { TagItem } from '../components/TagItem';

// 4.然后他不只是个数组 tags数组中的每一项都实现一个接口ITag,约定tags的每一项是什么
// 6.然后可以输入一下数据，看是不是会被约束，但是先不写，先留一个[]
// 8.1遍历，但是现在是为空的所以在这里先赋一个初值,然后能在map中输出了
// const initialTags: ITag[] = [{
//   id: 1,
//   title: 'linan'
// }]; 
// 这里要放的是真实的值，
const initialTags: ITag[] = []; 
const WelcomePage: React.FC<{}> = () => {
  // hooks可以将class react组件干掉，改为使用函数式组件，原因是useState可以提供状态及修改 然后useEffect可以提供生命周期函数

  // 3.1useState后面一定要给一个默认值，要么就不给（undefined），给了的话他的类型一定要能推断出来，不然就会报错，所以在前面声明的时候就要先:[]声明类型
  const [tags, setTag] = useState(initialTags)
  useEffect(()=> {
    // 9
    // 类似lifecycle hooks函数的副作用，有什么用？
    // 加入intialTags要去真的数据，就不是像现在这样直接在这里写
    // 要去取tags,就要->api->mock->真的api 接口请求
    // 这是我们要请求的url的接口，把所有的tag都请求一次，
    const url = '/api/tag/all'; 
    // 发出请求，fetchData
    // 有一个404错误 GET http://localhost:8000/api/tag/all 404 (Not Found)
    fetchData(url, 'GET')
    .then(data => {
      // console.log(data)
      //还需要mvvm 数据来了setTags一下
      setTag(data.data)
    })
    // umi是一个整栈的开发框架，可以用它来开发react项目
  }, []) 
  return (
    // 7.
    <div className="inputPageWrapper">
      {
        // 8.遍历每一项
        tags.map(tagObj => ( //注意这里要写小括号
          // 封装一个组件
          <TagItem key={tagObj.id} title={tagObj.title} />
          // <div>{tagObject.title}</div>
        ))
      }
    </div>
  )
}

//向外输出这个组件
export default WelcomePage
// yarn start运行一下 有一个路由守卫
// 输入admin ->密码：ant.design
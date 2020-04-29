import React, { useEffect } from 'react';
import {} from './style.js';
import { renderRoutes } from 'react-router-config'; //要能跳转的话要加这个，
// 将数据状态map到ui组件中 connect 连接store
import { connect } from "react-redux"; //先引入connect
import * as actionTypes from './store/actionCreators';

//将会变成一个函数式组件 以展示为主，数据流会注入进去

function Recommend(props){
    // ？？子路由为什么要这么做
    // 当有父子路由的时候 props是什么
    console.log(props); 
    // {history: {…}, location: {…}, match: {…}, staticContext: undefined, route: {…}}
    // const { route } = props;
    console.log(props.bannerList);//打印一下

  // 使用useEffect
  useEffect(()=>{
    if(!bannerList.size){
      getBannerDataDispatch();
    }
  }, []);
  return (
    <div>
      Recommend
      {/* 再使用 */}
      {/* { renderRoutes(route.routes)} */}
    </div>
  );
}
 
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    }
  }
};
// export default React.memo(Recommend);
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
// connect是一个HOC组件（高阶组件）会在原有组建外面包一层，可以想象成装饰者模式 附加的提供一些功能
//把原来要展现的Recommend外面再包一层功能
// mapStateToProps
// mapDispatchToProps  里面有action 触发action状态就改变
// React.memo(Recommend)可以是一个性能优化，只有在props更新的时候才会重绘，是一个性能优化
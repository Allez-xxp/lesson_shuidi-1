// 能配置吗？
import React from 'react';
import Home from '../application/Home';
import { Redirect } from 'react-router-dom';
import Recommend from '../application/Recommend';
import Signers from '../application/Singers';
import Rank from '../application/Rank';

export default [{ //路由的一个数组
  path: "/",
  component: Home, //根路由先交给Home 然后匹配里面的子路由
  routes: [
    {
      path: "/",
      exact: true,
      render: () => (
        <Redirect to={"/recommend"}/>
      )
    },
    {
      path: "/recommend",
      component: Recommend
    },
    {
      path: "/singers",
      component: Signers
    },
    {
      path: "/rank",
      component: Rank
    },
  ]
}]
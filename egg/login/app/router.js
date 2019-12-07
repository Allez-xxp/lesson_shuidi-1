'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 网站要有很多个模块的 /register  /login/register (登录模块中有注册)
  // 注册 是请求和相应的过程req res controller 控制器层 找login中的register方法
  router.post('/login/register',controller.login.register);
  // 登录 用post来请求login 要实现登录了
  router.post('/login',controller.login.loginIn)
};

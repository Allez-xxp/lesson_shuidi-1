- 泡泡堂游戏的主业务逻辑抽象
  面向对象核心思想：抽象（函数）、封装、继承、多态
  把实现细节抽象起来
  创业
  CEO 负责做梦（来旅梦，去名企，有需求 2020，+团队）
  抽象的，只是一个理念，需要找员工来实现，员工（前端，后端，美工），每个人都是一个函数->实现封装
- 工厂类，抽象了队友和敌人
  playFactory(name,teamColor) 代理了产生实例的过程
  players数组,在实例化的过程中建立好关系

  player是独立的玩家类，以面向对象的思想面向一切
  playerFactory类 以工厂的模式去生产
  从单个的对象去面向对象的集合，生产过程就可以工厂化<-工厂模式
  - partners[]
  - enemies[]
  - die()
    lose()
    win()
  - all_dead=false会需要判断多个=>all_all=true只需判断一个
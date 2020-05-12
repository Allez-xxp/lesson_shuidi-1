const Service = require('egg').Service;

class BookService extends Service {
  constructor(ctx) {
      super(ctx); // 调用父对象上的函数。
      this.tableName = 'Book'; // 数据库表名。//要处理的表名 egg可以通过squalize直接操纵表
      this.database = this.ctx.model[this.tableName]; // 获取 model 下的表（ model 相当于数据库的表 ）。
    //   找到上下文中的模型层
  }


  /**
   * 根据Id获取表信息。
   * @param {*} id 
   */
//   这是我们定义的一个接口
  async selectById (id) {
    //   根据某个id找到某本书 
      const result = await this.database.findByPk(id); // sequelize 内置查询方法。
      return result;
  }
}


module.exports = BookService;
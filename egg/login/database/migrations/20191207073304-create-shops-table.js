'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      thumb_url:Sequelize.STRING,
      created_at:Sequelize.DATE,
      updated_at:Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop');
    /*
    执行与上面相反的，便于因出错而想撤回
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

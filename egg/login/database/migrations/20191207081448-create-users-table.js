'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 解构Sequelize就不用每次都Sequelize.INTEGER
    const {INTEGER,STRING,DATE}=Sequelize
    return queryInterface.createTable('users',{
      user_id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      username:{
        type:STRING(255),
        allowNull:false
      },
      email:{
        type:STRING(255),
        allowNull:false
      },
      password:{
        type:STRING(255),
        allowNull:false
      },
      avatarUrl:STRING(255),
      mobile:STRING(11),
      sex:{ type:INTEGER,
      defaultValue: 0},
      created_at:DATE,
      updated_at:DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
    /*
     sequelize db:migrate:undo撤销
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

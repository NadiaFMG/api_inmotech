'use strict';

import sequelize from '../src/database';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      User_id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      User_user:{
        type: Sequelize.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
      },
      User_password:{
        type: Sequelize.STRING(256),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      User_status_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'user_status',
          key: 'User_status_id',
        },
      },
      Role_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'role',
          key: 'Role_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {     
    await queryInterface.dropTable('users');
  }
};

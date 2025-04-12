'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('profile', { 
      Profile_id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Profile_name:{
        type: Sequelize.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      Profile_phone:{
        type: Sequelize.STRING(10),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      Profile_addres:{
        type: Sequelize.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      Profile_email:{
        type: Sequelize.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      Profile_photo:{
        type: Sequelize.STRING(256),
        allowNull: false,
        collate: 'utf8_general_ci',
      },
      User_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'User_id',
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
    await queryInterface.dropTable('profile');
  }
};

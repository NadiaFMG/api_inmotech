'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permitions', {
      Permitions_id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Permitions_name:{
        type: Sequelize.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
      },
      Permitions_description:{
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
        collate: 'utf8_general_ci',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('permitions');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('module_role', {
      Permitions_module_role_id:{
              
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Module_role_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'module_role',
          key: 'Module_role_id',
        }
      },
      Permitions_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'permitions',
          key: 'Permitions_id',
        }
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
    await queryInterface.dropTable('module_role');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('module_role', {
      Module_role_id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
      },
      Module_FK:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'module',
          key: 'Module_id',
        }
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

// import { DataTypes } from 'sequelize';
// import sequelize from '../database/index.js';
// import role from './role.js';
// import module from './module.js';

// const moduleRole = sequelize.define('module_role',{
//     Module_role_id:{
//         type: DataTypes.INTEGER(11),
//         primaryKey: true,
//         allowNull: false,
//     },
//     Module_FK:{
//         type: DataTypes.INTEGER(11),
//         allowNull: false,
//     },
//     Role_FK:{
//         type: DataTypes.INTEGER(11),
//         allowNull: false,
//     },
//     createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//     },
//     updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//     }
// },
// {
//     tableName: 'module_role'
// });

// moduleRole.belongsToMany(module, { through: moduleRole, as:'roles', foreignKey: 'Module_FK' });
// moduleRole.belongsToMany(role, { through: moduleRole, as:'modules', foreignKey: 'Role_FK' }); 

// module.hasMany(moduleRole, { foreignKey: 'Module_FK'});
// role.hasMany(moduleRole, { foreignKey: 'Role_FK'});
// moduleRole.belongsTo(module, { foreignKey: 'Module_FK'});
// moduleRole.belongsTo(role, { foreignKey: 'Role_FK'});

// export default moduleRole;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModuleRole extends Model {
    static associate(models) {
      ModuleRole.belongsTo(models.module, {
        foreignKey: 'Module_FK',
        as: 'module'
      });
      ModuleRole.belongsTo(models.role, {
        foreignKey: 'Role_FK',
        as: 'role'
      });
    }
  }

  ModuleRole.init({
    Module_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Role_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'module_role',
    tableName: 'module_role',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return ModuleRole;
};
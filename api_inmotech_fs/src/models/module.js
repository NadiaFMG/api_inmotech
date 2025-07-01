// import { DataTypes } from 'sequelize';
// import sequelize from '../database/index.js';

// const module = sequelize.define('module',{
//     Module_id:{
//         type: DataTypes.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     Module_name:{
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//         unique: true
//     },
//     Module_route:{
//         type: DataTypes.STRING(30),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//         unique: true
//     },
//     Module_description:{
//         type: DataTypes.STRING(100),
//         allowNull: true,
//         defaultValue: null,
//         collate: 'utf8_general_ci',
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
//     tableName: 'module'
// })

// export default module;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.module_role, {
        foreignKey: 'Module_FK',
        as: 'module_roles'
      });
    }
  }

  Module.init({
    Module_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Module_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
    modelName: 'module',
    tableName: 'module',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Module;
};
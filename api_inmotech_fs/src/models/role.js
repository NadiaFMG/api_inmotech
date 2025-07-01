// import { DataTypes } from 'sequelize';
// import sequelize from '../database/index.js'; // Importa la instancia de Sequelize

// const role = sequelize.define('role', {
//     Role_id:{
//         type: DataTypes.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,

//     },
//     Role_name:{
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//         unique: true
//     },
//     Role_description:{
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
//     tableName: 'role'
// });

// export default role;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.users, {
        foreignKey: 'Role_FK',
        as: 'users'
      });
    }
  }

  Role.init({
    Role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Role_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    Role_status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    Role_priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'role',
    tableName: 'role',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Role;
};
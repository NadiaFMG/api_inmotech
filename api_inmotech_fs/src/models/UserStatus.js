// import { DataTypes } from 'sequelize';
// import sequelize from '../database/index.js';

// const userStatus = sequelize.define('user_status', {
//     User_status_id:{
//         type: DataTypes.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     User_status_name:{
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//         unique: true
//     },
//     User_status_description:{
//         type: DataTypes.STRING(100),
//         allowNull: true,
//         defaultValue: null,
//         collate: 'utf8_general_ci',
//     },
//     createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//     },
//         updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//     }
// },
// {
//     tableName: 'user_status'
    
// });

// export default userStatus;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    static associate(models) {
      UserStatus.hasMany(models.users, {
        foreignKey: 'User_status_FK',
        as: 'users'
      });
    }
  }

  UserStatus.init({
    User_status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    User_status_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    User_status_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    modelName: 'user_status',
    tableName: 'user_status',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return UserStatus;
};
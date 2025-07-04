// import {DataTypes} from 'sequelize';
// import sequelize from '../database/index.js';
// import userStatus from './user_status.js';
// import role from './role.js';

// const users = sequelize.define('users', {
//     User_id:{
//         type: DataTypes.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     User_user:{
//         type: DataTypes.STRING(30),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//         unique: true
//     },
//     User_password:{
//         type: DataTypes.STRING(256),
//         allowNull: false,
//         collate: 'utf8_general_ci',
//     },
//     User_status_FK:{
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
//         updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//     }
// },
// {
//     tableName: 'users'
// });

// users.belongsTo(userStatus, { foreignKey: 'User_status_FK', targetKey: 'User_status_id' });
// users.belongsTo(role, { foreignKey: 'Role_FK', targetKey: 'Role_id' });

// export default users;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.UserStatus, {
        foreignKey: 'User_status_FK',
        as: 'user_status'
      });
      Users.belongsTo(models.Role, {
        foreignKey: 'Role_FK',
        as: 'role'
      });
    }
  }

  Users.init({
    User_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    User_user: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    User_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    User_status_FK: {
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
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Users;
};
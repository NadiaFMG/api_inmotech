const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    static associate(models) {
      UserStatus.hasMany(models.Users, {
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
    modelName: 'UserStatus',
    tableName: 'user_status',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return UserStatus;
};
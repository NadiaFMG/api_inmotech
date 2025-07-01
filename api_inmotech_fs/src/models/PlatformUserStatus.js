const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformUserStatus extends Model {
    static associate(models) {
      PlatformUserStatus.hasMany(models.platform_user, {
        foreignKey: 'Platform_user_status_FK',
        as: 'platform_users'
      });
    }
  }

  PlatformUserStatus.init({
    Platform_user_status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Platform_user_status_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Platform_user_status_description: {
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
    modelName: 'platform_user_status',
    tableName: 'platform_user_status',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return PlatformUserStatus;
};
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformUser extends Model {
    static associate(models) {
      PlatformUser.belongsTo(models.PlatformUserStatus, {
        foreignKey: 'Platform_user_status_FK',
        as: 'platform_user_status'
      });
      PlatformUser.hasMany(models.UserFavorito, { 
        foreignKey: 'Platform_user_FK',
        as: 'favoritos'
      });
    }
  }

  PlatformUser.init({
    Platform_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Platform_user_status_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Platform_role_FK: {
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
    modelName: 'PlatformUser',
    tableName: 'platform_user',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return PlatformUser;
};
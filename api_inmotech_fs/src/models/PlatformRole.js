'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformRole extends Model {
    static associate(models) {
      // Un rol puede tener muchos usuarios de plataforma
      PlatformRole.hasMany(models.PlatformUser, { foreignKey: 'Platform_role_FK', sourceKey: 'Platform_role_id' });
      // Un rol puede tener muchos module_role si tienes esa tabla
      PlatformRole.hasMany(models.PlatformModuleRole, { foreignKey: 'Platform_role_FK', sourceKey: 'Platform_role_id' });
    }
  }
  PlatformRole.init({
    Platform_role_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Role_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Role_status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    Role_priority: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 0,
    },
    Created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'PlatformRole',
    tableName: 'platform_role',
    timestamps: false
  });
  return PlatformRole;
};
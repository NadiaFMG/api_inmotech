'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformModule extends Model {
    static associate(models) {
      PlatformModule.hasMany(models.PlatformModuleRole, { foreignKey: 'Platform_module_FK', sourceKey: 'Platform_module_id' });
    }
  }
  PlatformModule.init({
    Platform_module_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Module_route: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Module_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Module_icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Module_status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    Module_priority: {
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
    modelName: 'PlatformModule',
    tableName: 'platform_module',
    timestamps: false
  });
  return PlatformModule;
};
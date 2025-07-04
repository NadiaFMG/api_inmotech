'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformModuleRole extends Model {
    static associate(models) {
      PlatformModuleRole.belongsTo(models.PlatformRole, { foreignKey: 'Platform_role_FK', targetKey: 'Platform_role_id' });
      PlatformModuleRole.belongsTo(models.PlatformModule, { foreignKey: 'Platform_module_FK', targetKey: 'Platform_module_id' });
    }
  }
  PlatformModuleRole.init({
    Platform_module_role_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Platform_role_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Platform_module_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Module_role_status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
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
    modelName: 'PlatformModuleRole',
    tableName: 'platform_module_role',
    timestamps: false
  });
  return PlatformModuleRole;
};
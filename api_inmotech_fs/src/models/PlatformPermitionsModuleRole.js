'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformPermitionsModuleRole extends Model {
    static associate(models) {
      PlatformPermitionsModuleRole.belongsTo(models.PlatformPermitions, { foreignKey: 'Platform_permitions_FK', targetKey: 'Platform_permitions_id' });
      PlatformPermitionsModuleRole.belongsTo(models.PlatformModuleRole, { foreignKey: 'Platform_module_role_FK', targetKey: 'Platform_module_role_id' });
    }
  }
  PlatformPermitionsModuleRole.init({
    Platform_permitions_module_role_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Platform_permitions_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Platform_module_role_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Permitions_module_role_status: {
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
    modelName: 'PlatformPermitionsModuleRole',
    tableName: 'platform_permitions_module_role',
    timestamps: false
  });
  return PlatformPermitionsModuleRole;
};
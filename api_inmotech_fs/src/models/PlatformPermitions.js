'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformPermitions extends Model {
    static associate(models) {
      PlatformPermitions.hasMany(models.PlatformPermitionsModuleRole, { foreignKey: 'Platform_permitions_FK', sourceKey: 'Platform_permitions_id' });
    }
  }
  PlatformPermitions.init({
    Platform_permitions_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Permitions_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Permitions_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Permitions_status: {
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
    modelName: 'PlatformPermitions',
    tableName: 'platform_permitions',
    timestamps: false
  });
  return PlatformPermitions;
};
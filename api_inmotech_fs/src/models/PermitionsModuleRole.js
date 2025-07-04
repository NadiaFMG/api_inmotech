const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PermitionsModuleRole extends Model {
    static associate(models) {
      PermitionsModuleRole.belongsTo(models.Permitions, {
        foreignKey: 'Permitions_FK',
        as: 'permitions'
      });
      PermitionsModuleRole.belongsTo(models.ModuleRole, {
        foreignKey: 'Module_role_FK',
        as: 'module_role'
      });
    }
  }

  PermitionsModuleRole.init({
    Permitions_module_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_role_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Permitions_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Permitions_module_role_status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
    modelName: 'PermitionsModuleRole',
    tableName: 'permitions_module_role',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return PermitionsModuleRole;
};
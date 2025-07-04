const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModuleRole extends Model {
    static associate(models) {
      ModuleRole.belongsTo(models.module, {
        foreignKey: 'Module_FK',
        as: 'module'
      });
      ModuleRole.belongsTo(models.Role, {
        foreignKey: 'Role_FK',
        as: 'role'
      });
    }
  }

  ModuleRole.init({
    Module_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_FK: {
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
    modelName: 'ModuleRole',
    tableName: 'module_role',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return ModuleRole;
};
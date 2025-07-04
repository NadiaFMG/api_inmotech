const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.hasMany(models.ModuleRole, {
        foreignKey: 'Module_FK',
        as: 'module_roles'
      });
    }
  }

  Module.init({
    Module_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Module_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Module_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
    modelName: 'module',
    tableName: 'module',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Module;
};
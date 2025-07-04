const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permitions extends Model {
    static associate(models) {
      Permitions.hasMany(models.PermitionsModuleRole, {
        foreignKey: 'Permitions_FK',
        as: 'permitions_module_roles'
      });
    }
  }

  Permitions.init({
    Permitions_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Permitions_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Permitions_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    Permitions_status: {
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
    modelName: 'Permitions',
    tableName: 'permitions',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Permitions;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ndap extends Model {
    static associate(models) {
      Ndap.hasMany(models.Municipio, { foreignKey: 'Ndap_FK', sourceKey: 'Ndap_id' });
    }
  }
  Ndap.init({
    Ndap_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Ndap_descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    Created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Ndap',
    tableName: 'ndap',
    timestamps: false
  });
  return Ndap;
};
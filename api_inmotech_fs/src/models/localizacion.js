'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Localizacion extends Model {
    static associate(models) {
      Localizacion.hasMany(models.Direccion, { foreignKey: 'Localizacion_FK', sourceKey: 'Localizacion_id' });
    }
  }
  Localizacion.init({
    Localizacion_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Localizacion_descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Latitud: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    Longitud: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true
    },
    Activo: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
    Created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Localizacion',
    tableName: 'localizacion',
    timestamps: false
  });
  return Localizacion;
};
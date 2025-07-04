'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PoliticaDePrivacidad extends Model {}
  PoliticaDePrivacidad.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    activo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'PoliticaDePrivacidad',
    tableName: 'politica_de_privacidad',
    timestamps: false
  });
  return PoliticaDePrivacidad;
};

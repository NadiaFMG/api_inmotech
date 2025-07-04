'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SobreNosotros extends Model {}
  SobreNosotros.init({
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
    imagen_url: {
      type: DataTypes.STRING(500),
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
    modelName: 'SobreNosotros',
    tableName: 'sobre_nosotros',
    timestamps: false
  });
  return SobreNosotros;
};

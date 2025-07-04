'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PorqueElegirnos extends Model {}
  PorqueElegirnos.init({
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
    icono: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
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
    }
  }, {
    sequelize,
    modelName: 'PorqueElegirnos',
    tableName: 'porque_elegirnos',
    timestamps: false
  });
  return PorqueElegirnos;
};

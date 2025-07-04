'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TerminosYCondiciones extends Model {}
  TerminosYCondiciones.init({
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
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'TerminosYCondiciones',
    tableName: 'terminos_y_condiciones',
    timestamps: false
  });
  return TerminosYCondiciones;
};

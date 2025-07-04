'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ResolucionFactura extends Model {
    static associate(models) {
      ResolucionFactura.hasMany(models.Factura, { foreignKey: 'Resolucion_factura_FK', sourceKey: 'Resolucion_factura_id' });
    }
  }
  ResolucionFactura.init({
    Resolucion_factura_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Resolucion_facturacion_NO: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
    },
    Fecha_resolucion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'ResolucionFactura',
    tableName: 'resolucion_factura',
    timestamps: false
  });
  return ResolucionFactura;
};
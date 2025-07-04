'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    static associate(models) {
      Factura.hasMany(models.Suscripcion, { foreignKey: 'Factura_FK', sourceKey: 'Factura_id' });
      Factura.belongsTo(models.ResolucionFactura, { foreignKey: 'Resolucion_factura_FK', targetKey: 'Resolucion_factura_id' });
      Factura.belongsTo(models.ImpuestoValor, { foreignKey: 'Impuesto_valor_fk', targetKey: 'Impuesto_valor_id' });
      Factura.hasMany(models.Pago, { foreignKey: 'Factura_FK', sourceKey: 'Factura_id' });
    }
  }
  Factura.init({
    Factura_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Factura_NO: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    Nit_Vendedor: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Nit_Adquiriente: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    FechaEmision: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Resolucion_factura_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    Impuesto_valor_fk: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Factura',
    tableName: 'factura',
    timestamps: false
  });
  return Factura;
};
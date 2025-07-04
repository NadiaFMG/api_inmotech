'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImpuestoValor extends Model {
    static associate(models) {
      ImpuestoValor.belongsTo(models.Impuesto, { foreignKey: 'Impuesto_FK', targetKey: 'Impuesto_id' });
      ImpuestoValor.belongsTo(models.Valor, { foreignKey: 'Valor_FK', targetKey: 'Valor_id' });
      ImpuestoValor.belongsTo(models.RetenedorIva, { foreignKey: 'Retenedor_iva_FK', targetKey: 'Retenedor_IVA_id' });
      ImpuestoValor.hasMany(models.Factura, { foreignKey: 'Impuesto_valor_fk', sourceKey: 'Impuesto_valor_id' });
    }
  }
  ImpuestoValor.init({
    Impuesto_valor_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Valor_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    Retenedor_iva_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    Impuesto_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'ImpuestoValor',
    tableName: 'impuesto_valor',
    timestamps: false
  });
  return ImpuestoValor;
};
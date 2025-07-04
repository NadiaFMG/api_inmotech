'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Valor extends Model {
    static associate(models) {
      Valor.hasMany(models.ImpuestoValor, { foreignKey: 'Valor_FK', sourceKey: 'Valor_id' });
    }
  }
  Valor.init({
    Valor_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Monto_IVA: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Valor_neto: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Valor_Total: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Valor',
    tableName: 'valor',
    timestamps: false
  });
  return Valor;
};
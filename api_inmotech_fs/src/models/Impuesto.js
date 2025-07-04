'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Impuesto extends Model {
    static associate(models) {
      Impuesto.hasMany(models.ImpuestoValor, { foreignKey: 'Impuesto_FK', sourceKey: 'Impuesto_id' });
    }
  }
  Impuesto.init({
    Impuesto_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    impuesto: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    TipodeImpuesto: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    Porcentaje: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    Column: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Impuesto',
    tableName: 'impuesto',
    timestamps: false
  });
  return Impuesto;
};
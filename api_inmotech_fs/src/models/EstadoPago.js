'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstadoPago extends Model {
    static associate(models) {
      EstadoPago.hasMany(models.Pago, { foreignKey: 'Estado_pago_FK', sourceKey: 'Estado_pago_id' });
    }
  }
  EstadoPago.init({
    Estado_pago_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Estado_pago: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'EstadoPago',
    tableName: 'estado_pago',
    timestamps: false
  });
  return EstadoPago;
};
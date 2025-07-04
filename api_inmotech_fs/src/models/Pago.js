'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.EstadoPago, { foreignKey: 'Estado_pago_FK', targetKey: 'Estado_pago_id' });
      Pago.belongsTo(models.Factura, { foreignKey: 'Factura_FK', targetKey: 'Factura_id' });
    }
  }
  Pago.init({
    Pago_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Referencia_transaccion: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    Fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Comentario: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Estado_pago_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    Factura_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Pago',
    tableName: 'pago',
    timestamps: false
  });
  return Pago;
};
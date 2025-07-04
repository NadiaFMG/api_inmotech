'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RetenedorIva extends Model {
    static associate(models) {
      RetenedorIva.hasMany(models.ImpuestoValor, { foreignKey: 'Retenedor_iva_FK', sourceKey: 'Retenedor_IVA_id' });
    }
  }
  RetenedorIva.init({
    Retenedor_IVA_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Porcentaje_retencion: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
    },
    Activo: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    Created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'RetenedorIva',
    tableName: 'retenedor_iva',
    timestamps: false
  });
  return RetenedorIva;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Corregimiento extends Model {
    static associate(models) {
      Corregimiento.belongsTo(models.Municipio, { foreignKey: 'Municipio_FK', targetKey: 'Municipio_id' });
      Corregimiento.hasMany(models.BarrioCiudadCorregimientoVereda, { foreignKey: 'Corregimiento_FK', sourceKey: 'Corregimiento_id' });
    }
  }
  Corregimiento.init({
    Corregimiento_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Corregimiento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Municipio_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
    modelName: 'Corregimiento',
    tableName: 'corregimiento',
    timestamps: false
  });
  return Corregimiento;
};
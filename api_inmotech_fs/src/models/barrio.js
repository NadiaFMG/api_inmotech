'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Barrio extends Model {
    static associate(models) {
      Barrio.hasMany(models.BarrioCiudadCorregimientoVereda, { foreignKey: 'Barrio_FK', sourceKey: 'Barrio_id' });
    }
  }
  Barrio.init({
    Barrio_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nombre_barrio: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
    modelName: 'Barrio',
    tableName: 'barrio',
    timestamps: false
  });
  return Barrio;
};
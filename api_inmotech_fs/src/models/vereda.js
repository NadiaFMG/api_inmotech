'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vereda extends Model {
    static associate(models) {
      Vereda.belongsTo(models.Municipio, { foreignKey: 'Municipio_FK', targetKey: 'Municipio_id' });
      Vereda.hasMany(models.BarrioCiudadCorregimientoVereda, { foreignKey: 'Vereda_Fk', sourceKey: 'Vereda_id' });
    }
  }
  Vereda.init({
    Vereda_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Vereda_nombre: {
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
    modelName: 'Vereda',
    tableName: 'vereda',
    timestamps: false
  });
  return Vereda;
};
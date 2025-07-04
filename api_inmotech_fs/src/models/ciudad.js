'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    static associate(models) {
      Ciudad.belongsTo(models.Municipio, { foreignKey: 'Municipio_FK', targetKey: 'Municipio_id' });
      Ciudad.hasMany(models.BarrioCiudadCorregimientoVereda, { foreignKey: 'Ciudad_FK', sourceKey: 'Ciudad_id' });
    }
  }
  Ciudad.init({
    Ciudad_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Ciudad: {
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
    modelName: 'Ciudad',
    tableName: 'ciudad',
    timestamps: false
  });
  return Ciudad;
};
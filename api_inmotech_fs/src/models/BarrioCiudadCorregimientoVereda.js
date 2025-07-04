'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BarrioCiudadCorregimientoVereda extends Model {
    static associate(models) {
      BarrioCiudadCorregimientoVereda.belongsTo(models.Barrio, { foreignKey: 'Barrio_FK', targetKey: 'Barrio_id' });
      BarrioCiudadCorregimientoVereda.belongsTo(models.Ciudad, { foreignKey: 'Ciudad_FK', targetKey: 'Ciudad_id' });
      BarrioCiudadCorregimientoVereda.belongsTo(models.Corregimiento, { foreignKey: 'Corregimiento_FK', targetKey: 'Corregimiento_id' });
      BarrioCiudadCorregimientoVereda.belongsTo(models.Vereda, { foreignKey: 'Vereda_Fk', targetKey: 'Vereda_id' });
      BarrioCiudadCorregimientoVereda.hasMany(models.Direccion, { foreignKey: 'Barrio_ciudad_corregimiento_vereda_FK', sourceKey: 'Barrio_ciudad_corregimiento_vereda_id' });
    }
  }
  BarrioCiudadCorregimientoVereda.init({
    Barrio_ciudad_corregimiento_vereda_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Barrio_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Ciudad_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Corregimiento_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Vereda_Fk: {
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
    modelName: 'BarrioCiudadCorregimientoVereda',
    tableName: 'barrio_ciudad_corregimiento_vereda',
    timestamps: false
  });
  return BarrioCiudadCorregimientoVereda;
};
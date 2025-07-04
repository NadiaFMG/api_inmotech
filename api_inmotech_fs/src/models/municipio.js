'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {
      Municipio.belongsTo(models.Ndap, { foreignKey: 'Ndap_FK', targetKey: 'Ndap_id' });
      Municipio.hasMany(models.Ciudad, { foreignKey: 'Municipio_FK', sourceKey: 'Municipio_id' });
      Municipio.hasMany(models.Corregimiento, { foreignKey: 'Municipio_FK', sourceKey: 'Municipio_id' });
      Municipio.hasMany(models.Vereda, { foreignKey: 'Municipio_FK', sourceKey: 'Municipio_id' });
    }
  }
  Municipio.init({
    Municipio_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Ndap_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Municipio_nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Municipio_descripcion: {
      type: DataTypes.TEXT,
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
    modelName: 'Municipio',
    tableName: 'municipio',
    timestamps: false
  });
  return Municipio;
};
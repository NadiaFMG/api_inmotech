'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ImagenesInmueble extends Model {
    static associate(models) {
      ImagenesInmueble.hasOne(models.Inmueble, { foreignKey: 'Imagenes_inmueble_FK', sourceKey: 'Imagenes_inmueble_id' });
    }
  }
  ImagenesInmueble.init({
    Imagenes_inmueble_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Imagenes: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'ImagenesInmueble',
    tableName: 'imagenes_inmueble',
    timestamps: false
  });
  return ImagenesInmueble;
};
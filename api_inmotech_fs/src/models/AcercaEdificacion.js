'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AcercaEdificacion extends Model {
    static associate(models) {
      AcercaEdificacion.hasOne(models.Inmueble, { foreignKey: 'Acerca_edificacion_FK', sourceKey: 'Acerca_edificacion_id' });
    }
  }
  AcercaEdificacion.init({
    Acerca_edificacion_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    AcercaDeLaEdificacion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Estrato: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Tipo_construccion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Anio_construccion: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Estado_conservacion: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Zona_comun: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    Descripcion_adicional: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'AcercaEdificacion',
    tableName: 'acerca_edificacion',
    timestamps: false
  });
  return AcercaEdificacion;
};
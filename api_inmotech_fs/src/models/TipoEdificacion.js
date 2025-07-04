'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoEdificacion extends Model {
    static associate(models) {
      TipoEdificacion.hasMany(models.Inmueble, { foreignKey: 'Tipo_edificacion_FK', sourceKey: 'Tipo_edificacion_id' });
    }
  }
  TipoEdificacion.init({
    Tipo_edificacion_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Tipo_edificacion_categoria: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Tipo_edificacion_descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Tipo_edificacion_niveles: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Tipo_edificacion_activo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
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
    modelName: 'TipoEdificacion',
    tableName: 'tipo_edificacion',
    timestamps: false
  });
  return TipoEdificacion;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OtrasCaracteristicas extends Model {
    static associate(models) {
      OtrasCaracteristicas.belongsTo(models.Asignacion, { foreignKey: 'Asignacion_FK', targetKey: 'Asignacion_id', as: 'asignacion' });
      OtrasCaracteristicas.hasOne(models.Inmueble, { foreignKey: 'Otras_caracteristicas_FK', sourceKey: 'Otras_caracteristicas_id' });
    }
  }
  OtrasCaracteristicas.init({
    Otras_caracteristicas_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Caracteristicas_descripcion: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Deposito: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Lavanderia: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    Gas: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    Piso: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Mascotas_permitidas: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    Tipo_inmueble: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Amoblado: {
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
    },
    Asignacion_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'OtrasCaracteristicas',
    tableName: 'otras_caracteristicas',
    timestamps: false
  });
  return OtrasCaracteristicas;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asignacion extends Model {
    static associate(models) {
      Asignacion.belongsTo(models.OrganizacionParqueadero, { foreignKey: 'Organizacion_parqueadero_FK', targetKey: 'Organizacion_parqueadero_id', as: 'organizacionParqueadero' });
      Asignacion.hasOne(models.OtrasCaracteristicas, { foreignKey: 'Asignacion_FK', sourceKey: 'Asignacion_id' });
    }
  }
  Asignacion.init({
    Asignacion_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Parqueaderos_asignados: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    Organizacion_parqueadero_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Disponible: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    },
    Descripcion: {
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
    modelName: 'Asignacion',
    tableName: 'asignacion',
    timestamps: false
  });
  return Asignacion;
};
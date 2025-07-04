'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganizacionParqueadero extends Model {
    static associate(models) {
      OrganizacionParqueadero.hasOne(models.Asignacion, { foreignKey: 'Organizacion_parqueadero_FK', sourceKey: 'Organizacion_parqueadero_id' });
    }
  }
  OrganizacionParqueadero.init({
    Organizacion_parqueadero_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Tipo_parqueadero: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Cantidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Cubierto: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    Disponible: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'OrganizacionParqueadero',
    tableName: 'organizacion_parqueadero',
    timestamps: false
  });
  return OrganizacionParqueadero;
};
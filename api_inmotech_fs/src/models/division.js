'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    static associate(models) {
      Division.hasOne(models.Inmueble, { foreignKey: 'Division_FK', sourceKey: 'Division_id' });
    }
  }
  Division.init({
    Division_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Division: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Balcon: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'No',
    },
    Baños: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Terraza: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Habitaciones: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
    },
    Garaje: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Ascensores: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    Area: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    Closets: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Estudio: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    Sala: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    },
    Comedor: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    },
    Cocina: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Zona_lavanderia: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    Deposito: {
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
    modelName: 'Division',
    tableName: 'division',
    timestamps: false
  });
  return Division;
};
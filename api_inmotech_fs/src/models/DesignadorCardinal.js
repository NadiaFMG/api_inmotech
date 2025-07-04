'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DesignadorCardinal extends Model {
    static associate(models) {
      DesignadorCardinal.hasMany(models.Direccion, { foreignKey: 'Designador_cardinal_FK', sourceKey: 'Designador_cardinal_id' });
    }
  }
  DesignadorCardinal.init({
    Designador_cardinal_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Cardinalidad: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Abreviacion: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Activo: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
    Created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'DesignadorCardinal',
    tableName: 'designador_cardinal',
    timestamps: false
  });
  return DesignadorCardinal;
};
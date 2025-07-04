'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      Direccion.belongsTo(models.DesignadorCardinal, { foreignKey: 'Designador_cardinal_FK', targetKey: 'Designador_cardinal_id' });
      Direccion.belongsTo(models.Localizacion, { foreignKey: 'Localizacion_FK', targetKey: 'Localizacion_id' });
      Direccion.belongsTo(models.BarrioCiudadCorregimientoVereda, { foreignKey: 'Barrio_ciudad_corregimiento_vereda_FK', targetKey: 'Barrio_ciudad_corregimiento_vereda_id' });
    }
  }
  Direccion.init({
    Direccion_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Tipo_via: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Numero_via_principal: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Numero_calle_transversal: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Numero_edificacion: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Descripcion_adicional: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Designador_cardinal_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Localizacion_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Barrio_ciudad_corregimiento_vereda_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    modelName: 'Direccion',
    tableName: 'direccion',
    timestamps: false
  });
  return Direccion;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Suscripcion extends Model {
    static associate(models) {
      Suscripcion.belongsTo(models.Factura, { foreignKey: 'Factura_FK', targetKey: 'Factura_id' });
      Suscripcion.belongsTo(models.PlatformUser, { foreignKey: 'Platform_user_FK', targetKey: 'Platform_user_id' });
    }
  }
  Suscripcion.init({
    Suscripcion_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Platform_user_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Suscripcion_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Suscripcion_tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Suscripcion_descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    Suscripcion_duracion: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    Factura_FK: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Suscripcion',
    tableName: 'suscripcion',
    timestamps: false
  });
  return Suscripcion;
};
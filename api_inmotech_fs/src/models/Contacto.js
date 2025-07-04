'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
      Contacto.belongsTo(models.PlatformUser, { foreignKey: 'platform_user_id', targetKey: 'Platform_user_id' });
    }
  }
  Contacto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    platform_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    asunto: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rol_contacto: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    leido: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_envio: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    fecha_respuesta: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Contacto',
    tableName: 'contacto',
    timestamps: false
  });
  return Contacto;
};

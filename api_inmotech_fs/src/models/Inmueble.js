'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inmueble extends Model {
    static associate(models) {
      Inmueble.belongsTo(models.TipoEdificacion, { foreignKey: 'Tipo_edificacion_FK', targetKey: 'Tipo_edificacion_id', as: 'tipoEdificacion' });
      Inmueble.belongsTo(models.OtrasCaracteristicas, { foreignKey: 'Otras_caracteristicas_FK', targetKey: 'Otras_caracteristicas_id', as: 'otrasCaracteristicas' });
      Inmueble.belongsTo(models.AcercaEdificacion, { foreignKey: 'Acerca_edificacion_FK', targetKey: 'Acerca_edificacion_id', as: 'acercaEdificacion'});
      Inmueble.belongsTo(models.Division, { foreignKey: 'Division_FK', targetKey: 'Division_id', as: 'division' });
      Inmueble.belongsTo(models.ImagenesInmueble, { foreignKey: 'Imagenes_inmueble_FK', targetKey: 'Imagenes_inmueble_id' });
      Inmueble.belongsTo(models.PlatformUser, { foreignKey: 'Platform_user_FK', targetKey: 'Platform_user_id' });
      Inmueble.belongsTo(models.Direccion, { foreignKey: 'Direccion_FK', targetKey: 'Direccion_id' });
      Inmueble.hasMany(models.UserFavorito, { 
        foreignKey: 'Inmueble_FK',
        as: 'usuariosFavoritos'
      });
    }
  }
  Inmueble.init({
    Inmueble_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Valor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Area: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Descripcion_General: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Antiguedad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Motivo_VoA: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Situacion_inmueble: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Tipo_edificacion_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Otras_caracteristicas_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Acerca_edificacion_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Division_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Imagenes_inmueble_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Codigo_interno: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'disponible',
    },
    Fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Visitas: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 0,
    },
    Observaciones: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Platform_user_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Direccion_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    favorito: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'Inmueble',
    tableName: 'inmueble',
    timestamps: false
  });
  return Inmueble;
};
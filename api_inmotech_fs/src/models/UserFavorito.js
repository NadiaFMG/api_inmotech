'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserFavorito extends Model {
    static associate(models) {
      UserFavorito.belongsTo(models.PlatformUser, { 
        foreignKey: 'Platform_user_FK', 
        targetKey: 'Platform_user_id',
        as: 'usuario'
      });
      UserFavorito.belongsTo(models.Inmueble, { 
        foreignKey: 'Inmueble_FK', 
        targetKey: 'Inmueble_id',
        as: 'inmueble'
      });
    }
  }
  
  UserFavorito.init({
    User_favorito_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Platform_user_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Inmueble_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Fecha_agregado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'UserFavorito',
    tableName: 'user_favoritos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Platform_user_FK', 'Inmueble_FK']
      }
    ]
  });
  
  return UserFavorito;
};
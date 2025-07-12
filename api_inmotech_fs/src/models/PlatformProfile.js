'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformProfile extends Model {
    static associate(models) {
      // *** CORREGIDO AQUÍ: Usar Platform_user_FK en la asociación ***
      PlatformProfile.belongsTo(models.Users, { foreignKey: 'Platform_user_FK', targetKey: 'User_id' }); 
    }
  }
  PlatformProfile.init({
    Profile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Profile_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Profile_lastname: {
      type: DataTypes.STRING(30),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Profile_phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Profile_addres: {
      type: DataTypes.STRING(30),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Profile_email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Profile_photo: {
      type: DataTypes.STRING(256),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Profile_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Profile_gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Profile_national_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Profile_bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Profile_website: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Profile_social: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    // *** CAMBIO CLAVE AQUÍ: De User_FK a Platform_user_FK ***
    Platform_user_FK: { 
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true, // Esto es importante: asegura que cada usuario tenga solo un perfil
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'PlatformProfile',
    tableName: 'platform_profile',
    timestamps: true
  });
  return PlatformProfile;
};
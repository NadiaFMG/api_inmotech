'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformIdentityDocument extends Model {
    static associate(models) {
      PlatformIdentityDocument.belongsTo(models.PlatformProfile, { foreignKey: 'Platform_profile_FK', targetKey: 'Profile_id' });
    }
  }
  PlatformIdentityDocument.init({
    Identity_document_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Document_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Document_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      collate: 'utf8_general_ci',
    },
    Issued_country: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8_general_ci',
    },
    Issued_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Platform_profile_FK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
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
    modelName: 'PlatformIdentityDocument',
    tableName: 'platform_identity_document',
    timestamps: true
  });
  return PlatformIdentityDocument;
};
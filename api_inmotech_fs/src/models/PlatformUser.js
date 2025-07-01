// 'use strict';
// const { Model, DataTypes } = require('sequelize'); // Importa DataTypes aquí también

// module.exports = (sequelize) => { // La instancia de sequelize se pasa como argumento
//   class User extends Model {
//     /**
//      * Método auxiliar para definir asociaciones.
//      * Este método no forma parte del ciclo de vida de Sequelize.
//      * El archivo `models/index` llamará a este método automáticamente.
//      */
//     static associate(models) {
//       // Define aquí las asociaciones si las hay
//     }
//   }
//   ApiUser.init({
//     User_id: { // Renombrado a snake_case para consistencia con el primer modelo
//       type: DataTypes.INTEGER(11),
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: { // Renombrado a 'username' para consistencia
//       type: DataTypes.STRING(60),
//       allowNull: false,
//       unique: true
//     },
//     password_hash: { // Renombrado a 'password_hash' para consistencia
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     role: { // Renombrado a 'role' para consistencia y ajustado el ENUM
//       type: DataTypes.ENUM('admin', 'read_only'), // Utiliza snake_case como en el primer modelo
//       defaultValue: 'read_only' // Se asume un valor predeterminado como en el primer modelo
//     },
//     api_status: { // Mantenido 'api_status' ya que no había un equivalente directo en el primero
//       type: DataTypes.STRING(255),
//       allowNull: true
//     }
//   }, {
//     sequelize, // Pasa la instancia de sequelize
//     tableName: 'api_users',
//     modelName: 'ApiUser', // Asegúrate de que el modelName sea consistente
//     timestamps: true // Habilita la gestión automática de createdAt y updatedAt
//   });
//   return User;
// };

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlatformUser extends Model {
    static associate(models) {
      PlatformUser.belongsTo(models.platform_user_status, {
        foreignKey: 'Platform_user_status_FK',
        as: 'platform_user_status'
      });
    }
  }

  PlatformUser.init({
    Platform_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Platform_user_status_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Platform_role_FK: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
  }, {
    sequelize,
    modelName: 'platform_user',
    tableName: 'platform_user',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return PlatformUser;
};
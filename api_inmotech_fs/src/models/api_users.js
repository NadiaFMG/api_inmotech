import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const ApiUser = sequelize.define('api_users', {
  Api_user_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'Api_user_id' // Especifica el nombre real de la columna
  },
  Api_user: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
    field: 'Api_user' // Especifica el nombre real de la columna
  },
  Api_password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Api_password' // Especifica el nombre real de la columna
  },
  Api_role: {
    type: DataTypes.ENUM('admin', 'read-only'),
    allowNull: true,
    field: 'Api_role' // Especifica el nombre real de la columna
  },
  Api_status: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'Api_status' // Especifica el nombre real de la columna
  },
  createdAt: {
    allowNull: true, // Ajusta según si tu tabla tiene esta columna y si permite nulos
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: true, // Ajusta según si tu tabla tiene esta columna y si permite nulos
    type: DataTypes.DATE
  }
}, {
  tableName: 'api_users',
  timestamps: true, // Habilita la gestión automática de createdAt y updatedAt
  underscored: false // Utiliza nombres de columna camelCase en el modelo (opcional)
});

export default ApiUser;
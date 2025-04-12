import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const organizacionParqueadero = sequelize.define('organizacion_parqueadero', {
  Organizacion_parqueadero_id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Tipo_parqueadero: {
    type: DataTypes.STRING(30),
    allowNull: false,
    collate: 'utf8_general_ci',
  },
}, {
  tableName: 'organizacion_parqueadero',
  timestamps: false // To disable createdAt and updatedAt
  // Or, to customize the column names:
  // createdAt: 'fechaCreacion',
  // updatedAt: 'ultimaActualizacion'
});

export default organizacionParqueadero;
// asignacion.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Organizacion_Parqueadero from './organizacion_parqueadero.js';

const asignacion = sequelize.define('asignacion', {
  Asignacion_id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Parqueaderos_asignados: {
    type: DataTypes.STRING(10),
    allowNull: false,
    collate: 'utf8_general_ci',
  },
  Organizacion_parqueadero_FK: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    unique: true,
  
  },
}, {
  tableName: 'asignacion',
  timestamps: false
});


asignacion.belongsTo(Organizacion_Parqueadero, { foreignKey: 'Organizacion_parqueadero_FK', targetKey: 'Organizacion_parqueadero_id' });

export default asignacion;
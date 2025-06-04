import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const TipoEdificacion = sequelize.define('Tipo_edificacion', {
  Tipo_edificacion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    //autoIncrement: true,
    field: 'Tipo_edificacion_id' 
  },
  Tipo_edificacion_descripcion: {
    type: DataTypes.STRING(15),
    allowNull: false,
    field: 'Tipo_edificacion_descripcion'
  }
}, {
  tableName: 'tipo_edificacion',
  timestamps: false 
});

export default TipoEdificacion;
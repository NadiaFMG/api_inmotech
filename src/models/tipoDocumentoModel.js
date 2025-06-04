import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const TipoDocumento = sequelize.define('Tipo_documento', {
  Tipo_documento_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    //autoIncrement: true,
    field: 'Tipo_documento_id'
  },
  Tipo_documento_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'Tipo_documento_name'
  },
  Tipo_documento_acronym: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true, //  el campo debe ser único.
    field: 'Tipo_documento_acronym'
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: true,
    field: 'firstName'
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: true,
    field: 'lastName'
  }
}, {
  tableName: 'tipo_documento',
  timestamps: false
});

export default TipoDocumento;
// src/models/DocumentIdentification.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
//import TipoDocumento from './TipoDocumento.js';
//import Sexo from './Sexo.js';

const DocumentIdentification = sequelize.define('document_identification', {
  id_documento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_documento: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  fecha_expedicion: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  Tipo_documento_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipo_documento',
      key: 'id_tipo_documento'
    }
  },
  Sexo_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sexo',
      key: 'id_sexo'
    }
  }
}, {
  tableName: 'document_identification',
  timestamps: false
});

export default DocumentIdentification;

/* Relación: Muchos Documentos pertenecen a un TipoDocumento
DocumentIdentification.belongsTo(TipoDocumento, {
  foreignKey: 'Tipo_documento_FK',
  as: 'tipoDocumento'
});

// Relación: Muchos Documentos pertenecen a un Sexo
DocumentIdentification.belongsTo(Sexo, {
  foreignKey: 'Sexo_FK',
  as: 'sexo'
});

export default DocumentIdentification;*/

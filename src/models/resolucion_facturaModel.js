import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; 
const ResolucionFactura = sequelize.define('Resolucion_factura', {
  Resolucion_factura_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Resolucion_factura_id' 
  },
  Resolucion_facturacion_NO: {
    type: DataTypes.INTEGER, // int(20) en tu esquema
    allowNull: false, // No puede ser nulo
    field: 'Resolucion_facturacion_NO'
  },
  Fecha_resolucion: {
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW, 
    field: 'Fecha_resolucion'
  },
  Fecha_vencimiento: {
    type: DataTypes.DATE, // Tipo para timestamp
    allowNull: false, // No puede ser nulo
    defaultValue: DataTypes.NOW, // Se establece al tiempo actual por defecto
    field: 'Fecha_vencimiento'
  }
}, {
  tableName: 'resolucion_factura', 
  timestamps: false 
});

export default ResolucionFactura;
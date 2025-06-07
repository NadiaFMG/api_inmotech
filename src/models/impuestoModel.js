import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; // Asegúrate de que esta ruta a tu configuración de base de datos sea correcta

const Impuesto = sequelize.define('Impuesto', {
  Impuesto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'Impuesto_id' // Nombre exacto de la columna en la DB
  },
  impuesto: {
    type: DataTypes.STRING(20),
    allowNull: false, // No puede ser nulo
    field: 'impuesto'
  },
  TipodeImpuesto: {
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser NULL según tu esquema
    field: 'TipodeImpuesto'
  },
  Porcentaje: {
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser NULL según tu esquema
    field: 'Porcentaje'
  },
  Columna: { // ¡ADVERTENCIA!: 'Column' es una palabra clave SQL. Considera renombrarla.
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser NULL según tu esquema
    field: 'Columna'
  }
}, {
  tableName: 'impuesto', // Asegúrate de que el nombre de la tabla en la DB sea este
  timestamps: false // Asumiendo que no tienes campos createdAt y updatedAt
});

export default Impuesto;
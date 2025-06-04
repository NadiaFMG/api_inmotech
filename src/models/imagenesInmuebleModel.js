import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; 

const ImagenesInmueble = sequelize.define('imagenes_inmueble', {

  Imagenes_inmueble_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Imagenes_inmueble_id' 
  },
  Imagenes: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    field: 'Imagenes'
  },
  Nombre: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    field: 'Nombre'
  },
  URL: {
    type: DataTypes.INTEGER, 
    allowNull: true, 
    field: 'URL'
  }
}, {
  tableName: 'imagenes_inmueble', 
  timestamps: false 
});

export default ImagenesInmueble;
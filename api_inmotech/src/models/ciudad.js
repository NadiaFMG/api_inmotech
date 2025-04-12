import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
// import Barrio from './barrio.js';  // Remuevo la importación directa de Barrio
import Municipio from './municipio.js';
import BarrioCiudadCorregimientoVereda from './barrio_ciudad_corregimiento_vereda.js';

let Barrio; // Declaro Barrio antes de su definición
const Ciudad = sequelize.define('ciudad', {
    Ciudad_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Ciudad: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Municipio_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'municipio',
            key: 'Municipio_id',
        },
    },
}, {
    tableName: 'ciudad',
    timestamps: false,
});


export default Ciudad;

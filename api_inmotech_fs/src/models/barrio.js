import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
// import Ciudad from './ciudad.js';  // Remuevo la importación directa de Ciudad
import BarrioCiudadCorregimientoVereda from './barrio_ciudad_corregimiento_vereda.js';

let Ciudad; // Declaro Ciudad antes de su definición

const Barrio = sequelize.define('barrio', {
    Barrio_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nombre_barrio: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'barrio',
    timestamps: false,
});

export default Barrio;

// acerca_edificacion.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const Acerca_edificacion = sequelize.define('acerca_edificacion', {
    Acerca_edificacion_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    AcercaDeLaEdificacion: {
        type: DataTypes.STRING(10),
        allowNull: false,
        collate: 'utf8mb4_general_ci',
    },
    Estrato: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
}, {
    tableName: 'acerca_edificacion',
    timestamps: false,
});

export default Acerca_edificacion;
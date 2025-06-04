import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Municipio from './municipio.js';

const Corregimiento = sequelize.define('corregimiento', { // Cambiado a 'corregimiento'
    Corregimiento_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Corregimiento: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Municipio_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'Municipio',
            key: 'Municipio_id',
        },
    },
}, {
    tableName: 'corregimiento', // Cambiado a 'corregimiento'
    timestamps: false,
});

Corregimiento.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'municipio' });
Municipio.hasMany(Corregimiento, { foreignKey: 'Municipio_FK', as: 'corregimientos' });

export default Corregimiento;
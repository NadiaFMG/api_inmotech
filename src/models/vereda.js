import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Municipio from './municipio.js';

const vereda = sequelize.define('vereda', {
    Vereda_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Vereda_nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true,
    },
    Municipio_FK: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'municipio',
            key: 'Municipio_id',
        },
    },
}, {
    tableName: 'vereda',
    timestamps: false,
});

vereda.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'municipio' });
Municipio.hasMany(vereda, { foreignKey: 'Municipio_FK', as: 'veredas' });

export default vereda;


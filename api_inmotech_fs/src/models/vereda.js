import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const vereda = sequelize.define('vereda', {
    Vereda_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Vereda_nombre: {
        type: DataTypes.STRING(255), // Adjusted length as needed
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true,
    },
    Municipio_FK: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
       // createdAt: {
    //     allowNull: false,
    //     type: DataTypes.DATE,
    // },
    // updatedAt: {
    //     allowNull: false,
    //     type: DataTypes.DATE,
    // },
}, {
    tableName: 'vereda',
    timestamps: false
});

export default vereda;
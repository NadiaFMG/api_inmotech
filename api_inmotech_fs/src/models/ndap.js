import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const ndap = sequelize.define('ndap', {
    Ndap_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Ndap_descripcion: {
        type: DataTypes.STRING(255), // Adjust length as needed
        allowNull: false,
        collate: 'utf8_general_ci',
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
    tableName: 'ndap',
    timestamps: false
});

export default ndap;

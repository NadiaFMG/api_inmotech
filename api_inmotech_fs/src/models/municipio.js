import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const municipio = sequelize.define('municipio', {
    Municipio_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Ndap_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {         // Add this if Ndap_FK is a foreign key
            model: 'ndap',  // Replace 'ndap' with the actual table name
            key: 'Ndap_id'    // Replace 'Ndap_id' with the primary key of the ndap table
        }
    },
    Municipio_nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Municipio_descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'municipio',
    timestamps: false,
});

export default municipio;
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
        references: {         
            model: 'ndap',  
            key: 'Ndap_id'    
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


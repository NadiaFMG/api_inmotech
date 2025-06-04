import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const division = sequelize.define('division', {
    Division_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Division: {
        type: DataTypes.STRING(10),
        allowNull: false,
        
    },
    Balcon: {
        type: DataTypes.STRING(2),
        allowNull: false,
        
    },
    Baños: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
    },
    Terraza: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
    },
    Habitaciones: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
    },
    Garaje: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
    },
    Ascensores: {
        type: DataTypes.STRING(2),
        allowNull: false,
       
    },
    Area: {
        type: DataTypes.STRING(10),
        allowNull: false,
       
    },
    
}, {
    tableName: 'division',
    timestamps: false,
});

export default division;

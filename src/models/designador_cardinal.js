import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const DesignadorCardinal = sequelize.define('designador_cardinal', {
    Designador_cardinal_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Cardinalidad: {
        type: DataTypes.STRING(10),
        allowNull: false,
        
    },
    Abreviacion: {
        type: DataTypes.STRING(10),
        allowNull: false,
        
    }
}, {
    tableName: 'designador_cardinal', 
    timestamps: false 
});

export default DesignadorCardinal;


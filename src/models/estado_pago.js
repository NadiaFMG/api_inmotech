import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const estadoPago = sequelize.define('estado_pago', {
    Estado_pago_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Estado_pago: {
        type: DataTypes.STRING(20), 
        allowNull: false,
       
    },
    
}, {
    tableName: 'estado_pago',
    timestamps: false
});

export default estadoPago;

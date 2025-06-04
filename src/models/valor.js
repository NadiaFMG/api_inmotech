import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const valor = sequelize.define('valor', {
    Valor_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Monto_IVA: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Valor_neto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Valor_Total: {
        type: DataTypes.DECIMAL(10, 2),
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
    tableName: 'valor',
    timestamps: false
});

export default valor;

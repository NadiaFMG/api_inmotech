import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const Localizacion = sequelize.define('Localizacion', {
    Localizacion_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Localizacion_descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    }
}, {
    tableName: 'localizacion',
    timestamps: false
});



export default Localizacion;

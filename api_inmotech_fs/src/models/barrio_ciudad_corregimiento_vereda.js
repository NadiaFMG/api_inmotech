import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
const BarrioCiudadCorregimientoVereda = sequelize.define('barrio_ciudad_corregimiento_vereda', {
    Barrio_ciudad_corregimiento_vereda_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Barrio_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'barrio',
            key: 'Barrio_id'
        }
    },
    Ciudad_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'ciudad',
            key: 'Ciudad_id'
        }
    },
    Corregimiento_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'corregimiento',
            key: 'Corregimiento_id'
        }
    },
    Vereda_Fk: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: 'vereda',
            key: 'Vereda_id'
        }
    },
   
}, {
    tableName: 'barrio_ciudad_corregimiento_vereda',
    timestamps: false,
});


export default BarrioCiudadCorregimientoVereda;
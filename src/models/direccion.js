import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import DesignadorCardinal from './designador_cardinal.js';

import Localizacion from './localizacion.js';
import BarrioCiudadCorregimientoVereda from './barrio_ciudad_corregimiento_vereda.js';

const Direccion = sequelize.define('direccion', {
    Direccion_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Direccion: {
        type: DataTypes.INTEGER(30),
        allowNull: false
    },
    Tipo_via: {
        type: DataTypes.STRING(255),
        allowNull: false,
        
    },
    Numero_via_principal: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    Numero_calle_transversal: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    Numero_edificacion: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    Descripcion_adicional: {
        type: DataTypes.STRING(50),
        allowNull: false,
        
    },
    Designador_cardinal_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        unique: true,
        references: {
            model: DesignadorCardinal,
            key: 'Designador_cardinal_id'
        }
    },
    Localizacion_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        unique: true,
        references: {
            model: Localizacion, 
            key: 'Localizacion_id'
        }
    },
    Barrio_ciudad_corregimiento_vereda_FK: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
            model: BarrioCiudadCorregimientoVereda,
            key: 'Barrio_ciudad_corregimiento_vereda_id'
        }
    }
}, {
    tableName: 'direccion', 
    timestamps: false 
});

export default Direccion;
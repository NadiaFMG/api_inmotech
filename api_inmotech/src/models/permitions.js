import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const permitions = sequelize.define('permitions', {
    Permitions_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Permitions_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
    },
    Permitions_description:{
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
        collate: 'utf8_general_ci',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
},
{
    tableName: 'permitions'
});

export default permitions;
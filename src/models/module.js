import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const module = sequelize.define('module',{
    Module_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Module_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
    },
    Module_route:{
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
    },
    Module_description:{
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
    tableName: 'module'
})

export default module;
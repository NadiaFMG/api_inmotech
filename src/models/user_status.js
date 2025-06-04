import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const userStatus = sequelize.define('user_status', {
    User_status_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    User_status_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
    },
    User_status_description:{
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
    tableName: 'user_status'
    
});

export default userStatus;
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js'; // Importa la instancia de Sequelize

const role = sequelize.define('role', {
    Role_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

    },
    Role_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
        unique: true
    },
    Role_description:{
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
    tableName: 'role'
});

export default role;
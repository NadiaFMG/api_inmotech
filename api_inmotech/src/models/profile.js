import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import users from './users.js';

const profile = sequelize.define('profile',{
    Profile_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Profile_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        collate: 'utf8_general_ci',
    },
    Profile_phone:{
        type: DataTypes.STRING(10),
        allowNull: false,
        collate: 'utf8_general_ci',
    },
    Profile_addres:{
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
    },
    Profile_email:{
        type: DataTypes.STRING(30),
        allowNull: false,
        collate: 'utf8_general_ci',
    },
    Profile_photo:{
        type: DataTypes.STRING(256),
        allowNull: false,
        collate: 'utf8_general_ci',

    },
    User_FK:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true
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
    tableName: 'profile'
});

profile.belongsTo(users, { foreignKey: 'User_FK', targetKey: 'User_id' }); // Define la relación

export default profile;
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import moduleRole from './module_role.js';
import permitions from './permitions.js';


const permitionsModuleRole = sequelize.define('permitions_module_role',{
    Permitions_module_role_id:{
        
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Module_role_FK:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    Permitions_FK:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
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
    tableName: 'permitions_module_role'
});

// Definir las relaciones correctas
moduleRole.belongsToMany(permitions, {
    through: permitionsModuleRole,
    foreignKey: 'Module_role_FK', // Clave foránea en permitionsModuleRole que referencia a moduleRole
    otherKey: 'Permitions_FK', // Clave foránea en permitionsModuleRole que referencia a permitions
    as: 'permitions' // Alias para la relación
});

permitions.belongsToMany(moduleRole, {
    through: permitionsModuleRole,
    foreignKey: 'Permitions_FK', // Clave foránea en permitionsModuleRole que referencia a permitions
    otherKey: 'Module_role_FK', // Clave foránea en permitionsModuleRole que referencia a moduleRole
    as: 'moduleRoles' // Alias para la relación
});

// Definir las relaciones uno a muchos
permitionsModuleRole.belongsTo(moduleRole, { foreignKey: 'Module_role_FK' });
permitionsModuleRole.belongsTo(permitions, { foreignKey: 'Permitions_FK' });
moduleRole.hasMany(permitionsModuleRole, { foreignKey: 'Module_role_FK' });
permitions.hasMany(permitionsModuleRole, { foreignKey: 'Permitions_FK' });
export default permitionsModuleRole;
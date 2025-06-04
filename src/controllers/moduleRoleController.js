import moduleRole from '../models/module_role.js';

// Obtener todos los registros de module_role
export async function getAllModuleRoles(req, res) {
        try {
            const allModuleRoles = await moduleRole.findAll();
            res.json(allModuleRoles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

// Obtener un registro de module_role por ID
export async function getModuleRoleById(req, res) {
    try {
        const moduleRole = await moduleRole.findByPk(req.params.id);
        if (moduleRole) {
            res.json(moduleRole);
        } else {
            res.status(404).json({ message: 'Registro module_role no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo registro de module_role
export async function createModuleRole(req, res) {
    try {
        const newModuleRole = await moduleRole.create(req.body);
        res.status(201).json(newModuleRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un registro de module_role
export async function updateModuleRole(req, res) {
    try {
        const updatedModuleRole = await moduleRole.update(req.body, {
          where: { Module_role_id: req.params.id },
        });
        if (updatedModuleRole[0]) {
            res.json({ message: 'Registro module_role actualizado' });
        } else {
            res.status(404).json({ message: 'Registro module_role no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un registro de module_role
export async function deleteModuleRole(req, res) {
    try {
        const deletedModuleRole = await moduleRole.destroy({
            where: { Module_role_id: req.params.id },
        });
        if (deletedModuleRole) {
            res.json({ message: 'Registro module_role eliminado' });
        } else {
            res.status(404).json({ message: 'Registro module_role no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
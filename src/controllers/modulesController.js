import module from '../models/module.js';

// Obtener todos los módulos
export async function getAllModules(req, res) {
    try {
        const allModules = await module.findAll();
        res.json(allModules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un módulo por ID
export async function getModuleById(req, res) {
    try {
        const moduleItem = await module.findByPk(req.params.id);
        if (moduleItem) {
            res.json(moduleItem);
        } else {
            res.status(404).json({ message: 'Módulo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo módulo
export async function createModule(req, res) {
    try {
        const newModule = await module.create(req.body);
        res.status(201).json(newModule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un módulo
export async function updateModule(req, res) {
    try {
        const updatedModule = await module.update(req.body, {
            where: { Module_id: req.params.id },
        });
        if (updatedModule[0]) {
            res.json({ message: 'Módulo actualizado' });
        } else {
            res.status(404).json({ message: 'Módulo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un módulo
export async function deleteModule(req, res) {
    try {
        const deletedModule = await module.destroy({
            where: { Module_id: req.params.id },
        });
        if (deletedModule) {
            res.json({ message: 'Módulo eliminado' });
        } else {
            res.status(404).json({ message: 'Módulo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
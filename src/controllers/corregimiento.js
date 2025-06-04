import corregimiento from '../models/corregimiento.js';

// Obtener todos los corregimientos
export async function getAllCorregimientos(req, res) {
    try {
        const allCorregimientos = await corregimiento.findAll();
        res.json(allCorregimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un corregimiento por ID
export async function getCorregimientoById(req, res) {
    try {
        const corregimientoItem = await corregimiento.findByPk(req.params.id);
        if (corregimientoItem) {
            res.json(corregimientoItem);
        } else {
            res.status(404).json({ message: 'Corregimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo corregimiento
export async function createCorregimiento(req, res) {
    try {
        const newCorregimiento = await corregimiento.create(req.body);
        res.status(201).json(newCorregimiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un corregimiento
export async function updateCorregimiento(req, res) {
    try {
        const updatedCorregimiento = await corregimiento.update(req.body, {
            where: { Corregimiento_id: req.params.id },
        });
        if (updatedCorregimiento[0]) {
            res.json({ message: 'Corregimiento actualizado' });
        } else {
            res.status(404).json({ message: 'Corregimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un corregimiento
export async function deleteCorregimiento(req, res) {
    try {
        const deletedCorregimiento = await corregimiento.destroy({
            where: { Corregimiento_id: req.params.id },
        });
        if (deletedCorregimiento) {
            res.json({ message: 'Corregimiento eliminado' });
        } else {
            res.status(404).json({ message: 'Corregimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

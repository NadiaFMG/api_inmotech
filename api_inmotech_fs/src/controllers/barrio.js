import barrio from '../models/barrio.js';

// Obtener todos los barrios
export async function getAllBarrios(req, res) {
    try {
        const allBarrios = await barrio.findAll();
        res.json(allBarrios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un barrio por ID
export async function getBarrioById(req, res) {
    try {
        const barrioItem = await barrio.findByPk(req.params.id);
        if (barrioItem) {
            res.json(barrioItem);
        } else {
            res.status(404).json({ message: 'Barrio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo barrio
export async function createBarrio(req, res) {
    try {
        const newBarrio = await barrio.create(req.body);
        res.status(201).json(newBarrio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un barrio
export async function updateBarrio(req, res) {
    try {
        const updatedBarrio = await barrio.update(req.body, {
            where: { Barrio_id: req.params.id },
        });
        if (updatedBarrio[0]) {
            res.json({ message: 'Barrio actualizado' });
        } else {
            res.status(404).json({ message: 'Barrio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un barrio
export async function deleteBarrio(req, res) {
    try {
        const deletedBarrio = await barrio.destroy({
            where: { Barrio_id: req.params.id },
        });
        if (deletedBarrio) {
            res.json({ message: 'Barrio eliminado' });
        } else {
            res.status(404).json({ message: 'Barrio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

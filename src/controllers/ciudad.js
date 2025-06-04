import ciudad from '../models/ciudad.js';

// Obtener todas las ciudades
export async function getAllCiudades(req, res) {
    try {
        const allCiudades = await ciudad.findAll();
        res.json(allCiudades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una ciudad por ID
export async function getCiudadById(req, res) {
    try {
        const ciudadItem = await ciudad.findByPk(req.params.id);
        if (ciudadItem) {
            res.json(ciudadItem);
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva ciudad
export async function createCiudad(req, res) {
    try {
        const newCiudad = await ciudad.create(req.body);
        res.status(201).json(newCiudad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una ciudad
export async function updateCiudad(req, res) {
    try {
        const updatedCiudad = await ciudad.update(req.body, {
            where: { Ciudad_id: req.params.id },
        });
        if (updatedCiudad[0]) {
            res.json({ message: 'Ciudad actualizada' });
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una ciudad
export async function deleteCiudad(req, res) {
    try {
        const deletedCiudad = await ciudad.destroy({
            where: { Ciudad_id: req.params.id },
        });
        if (deletedCiudad) {
            res.json({ message: 'Ciudad eliminada' });
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

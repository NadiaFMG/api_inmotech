import localizacion from '../models/localizacion.js';

// Obtener todas las localizaciones
export async function getAllLocalizaciones(req, res) {
    try {
        const allLocalizaciones = await localizacion.findAll();
        res.json(allLocalizaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una localización por ID
export async function getLocalizacionById(req, res) {
    try {
        const localizacionItem = await localizacion.findByPk(req.params.id);
        if (localizacionItem) {
            res.json(localizacionItem);
        } else {
            res.status(404).json({ message: 'Localización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva localización
export async function createLocalizacion(req, res) {
    try {
        const newLocalizacion = await localizacion.create(req.body);
        res.status(201).json(newLocalizacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una localización
export async function updateLocalizacion(req, res) {
    try {
        const updatedLocalizacion = await localizacion.update(req.body, {
            where: { Localizacion_id: req.params.id },
        });
        if (updatedLocalizacion[0]) {
            res.json({ message: 'Localización actualizada' });
        } else {
            res.status(404).json({ message: 'Localización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una localización
export async function deleteLocalizacion(req, res) {
    try {
        const deletedLocalizacion = await localizacion.destroy({
            where: { Localizacion_id: req.params.id },
        });
        if (deletedLocalizacion) {
            res.json({ message: 'Localización eliminada' });
        } else {
            res.status(404).json({ message: 'Localización no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

import Asignacion from '../models/asignacion.js';

// Obtener todos los registros de asignacion
export async function getAllAsignacion(req, res) {
        try {
            const allAsignacion = await Asignacion.findAll();
            res.json(allAsignacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

// Obtener un registro de acerca_edificacion por ID
export async function getAsignacionById(req, res) {
    try {
        const AsignacionId = await Asignacion.findByPk(req.params.id);
        if (AsignacionId) {
            res.json(Asignacion);
        } else {
            res.status(404).json({ message: 'Registro asignacion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo registro de asignacion
export async function createAsignacion(req, res) {
    try {
        const newAsignacion = await Asignacion.create(req.body);
        res.status(201).json(newAsignacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un registro de asignacion
export async function updateAsignacion(req, res) {
    try {
        const updatedAsignacion = await Asignacion.update(req.body, {
          where: { Asignacion_id : req.params.id },
        });
        if (updatedAsignacion[0]) {
            res.json({ message: 'Registro asignacion actualizado' });
        } else {
            res.status(404).json({ message: 'Registro asignacion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un registro de asignacion
export async function deleteAsignacion(req, res) {
    try {
        const deletedAsignacion = await Asignacion.destroy({
            where: { Asignacion_id: req.params.id },
        });
        if (deletedAsignacion) {
            res.json({ message: 'Registro asignacion eliminado' });
        } else {
            res.status(404).json({ message: 'Registro  asignacion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

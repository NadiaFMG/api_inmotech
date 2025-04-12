import division from '../models/division.js';

// Obtener todas las divisiones
export async function getAllDivisions(req, res) {
    try {
        const allDivisions = await division.findAll();
        res.json(allDivisions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una división por ID
export async function getDivisionById(req, res) {
    try {
        const divisionItem = await division.findByPk(req.params.id);
        if (divisionItem) {
            res.json(divisionItem);
        } else {
            res.status(404).json({ message: 'División no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva división
export async function createDivision(req, res) {
    try {
        const newDivision = await division.create(req.body);
        res.status(201).json(newDivision);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una división
export async function updateDivision(req, res) {
    try {
        const updatedDivision = await division.update(req.body, {
            where: { Division_id: req.params.id },
        });
        if (updatedDivision[0]) {
            res.json({ message: 'División actualizada' });
        } else {
            res.status(404).json({ message: 'División no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una división
export async function deleteDivision(req, res) {
    try {
        const deletedDivision = await division.destroy({
            where: { Division_id: req.params.id },
        });
        if (deletedDivision) {
            res.json({ message: 'División eliminada' });
        } else {
            res.status(404).json({ message: 'División de identificación no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
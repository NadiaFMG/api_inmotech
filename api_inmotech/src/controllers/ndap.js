import ndap from '../models/ndap.js';

// Obtener todos los NDAPs
export async function getAllNdaps(req, res) {
    try {
        const allNdaps = await ndap.findAll();
        res.json(allNdaps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un NDAP por ID
export async function getNdapById(req, res) {
    try {
        const ndapItem = await ndap.findByPk(req.params.id);
        if (ndapItem) {
            res.json(ndapItem);
        } else {
            res.status(404).json({ message: 'NDAP no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo NDAP
export async function createNdap(req, res) {
    try {
        const newNdap = await ndap.create(req.body);
        res.status(201).json(newNdap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un NDAP
export async function updateNdap(req, res) {
    try {
        const updatedNdap = await ndap.update(req.body, {
            where: { Ndap_id: req.params.id },
        });
        if (updatedNdap[0]) {
            res.json({ message: 'NDAP actualizado' });
        } else {
            res.status(404).json({ message: 'NDAP no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un NDAP
export async function deleteNdap(req, res) {
    try {
        const deletedNdap = await ndap.destroy({
            where: { Ndap_id: req.params.id },
        });
        if (deletedNdap) {
            res.json({ message: 'NDAP eliminado' });
        } else {
            res.status(404).json({ message: 'NDAP no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

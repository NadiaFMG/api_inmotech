import vereda from '../models/vereda.js';

// Obtener todas las veredas
export async function getAllVeredas(req, res) {
    try {
        const allVeredas = await vereda.findAll();
        res.json(allVeredas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una vereda por ID
export async function getVeredaById(req, res) {
    try {
        const veredaItem = await vereda.findByPk(req.params.id);
        if (veredaItem) {
            res.json(veredaItem);
        } else {
            res.status(404).json({ message: 'Vereda no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva vereda
export async function createVereda(req, res) {
    try {
        const newVereda = await vereda.create(req.body);
        res.status(201).json(newVereda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una vereda
export async function updateVereda(req, res) {
    try {
        const updatedVereda = await vereda.update(req.body, {
            where: { Vereda_id: req.params.id },
        });
        if (updatedVereda[0]) {
            res.json({ message: 'Vereda actualizada' });
        } else {
            res.status(404).json({ message: 'Vereda no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function deleteVereda(req, res) {
    try {
        const deletedVereda = await vereda.destroy({
            where: { Vereda_id: req.params.id },
        });
        if (deletedVereda) {
            res.json({ message: 'Vereda eliminada' });
        } else {
            res.status(404).json({ message: 'Vereda no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
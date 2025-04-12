import valor from '../models/valor.js';

// Obtener todos los valores
export async function getAllValores(req, res) {
    try {
        const allValores = await valor.findAll();
        res.json(allValores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un valor por ID
export async function getValorById(req, res) {
    try {
        const valorItem = await valor.findByPk(req.params.id);
        if (valorItem) {
            res.json(valorItem);
        } else {
            res.status(404).json({ message: 'Valor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo valor
export async function createValor(req, res) {
    try {
        const newValor = await valor.create(req.body);
        res.status(201).json(newValor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un valor
export async function updateValor(req, res) {
    try {
        const updatedValor = await valor.update(req.body, {
            where: { Valor_id: req.params.id },
        });
        if (updatedValor[0]) {
            res.json({ message: 'Valor actualizado' });
        } else {
            res.status(404).json({ message: 'Valor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un valor
export async function deleteValor(req, res) {
    try {
        const deletedValor = await valor.destroy({
            where: { Valor_id: req.params.id },
        });
        if (deletedValor) {
            res.json({ message: 'Valor eliminado' });
        } else {
            res.status(404).json({ message: 'Valor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

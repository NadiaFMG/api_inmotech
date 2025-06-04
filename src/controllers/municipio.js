import municipio from '../models/municipio.js';

// Obtener todos los municipios
export async function getAllMunicipios(req, res) {
    try {
        const allMunicipios = await municipio.findAll();
        res.json(allMunicipios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un municipio por ID
export async function getMunicipioById(req, res) {
    try {
        const municipioItem = await municipio.findByPk(req.params.id);
        if (municipioItem) {
            res.json(municipioItem);
        } else {
            res.status(404).json({ message: 'Municipio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo municipio
export async function createMunicipio(req, res) {
    try {
        const newMunicipio = await municipio.create(req.body);
        res.status(201).json(newMunicipio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un municipio
export async function updateMunicipio(req, res) {
    try {
        const updatedMunicipio = await municipio.update(req.body, {
            where: { Municipio_id: req.params.id },
        });
        if (updatedMunicipio[0]) {
            res.json({ message: 'Municipio actualizado' });
        } else {
            res.status(404).json({ message: 'Municipio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un municipio
export async function deleteMunicipio(req, res) {
    try {
        const deletedMunicipio = await municipio.destroy({
            where: { Municipio_id: req.params.id },
        });
        if (deletedMunicipio) {
            res.json({ message: 'Municipio eliminado' });
        } else {
            res.status(404).json({ message: 'Municipio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

import barrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';

// Obtener todos los barrios, ciudades, corregimientos o veredas
export async function getAllBarriosCiudadesCorregimientosVeredas(req, res) {
    try {
        const allBarriosCiudadesCorregimientosVeredas = await barrioCiudadCorregimientoVereda.findAll();
        res.json(allBarriosCiudadesCorregimientosVeredas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un barrio, ciudad, corregimiento o vereda por ID
export async function getBarrioCiudadCorregimientoVeredaById(req, res) {
    try {
        const barrioCiudadCorregimientoVeredaItem = await barrioCiudadCorregimientoVereda.findByPk(req.params.id);
        if (barrioCiudadCorregimientoVeredaItem) {
            res.json(barrioCiudadCorregimientoVeredaItem);
        } else {
            res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo barrio, ciudad, corregimiento o vereda
export async function createBarrioCiudadCorregimientoVereda(req, res) {
    try {
        const newBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.create(req.body);
        res.status(201).json(newBarrioCiudadCorregimientoVereda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un barrio, ciudad, corregimiento o vereda
export async function updateBarrioCiudadCorregimientoVereda(req, res) {
    try {
        const updatedBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.update(req.body, {
            where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id },
        });
        if (updatedBarrioCiudadCorregimientoVereda[0]) {
            res.json({ message: 'Barrio, ciudad, corregimiento o vereda actualizado' });
        } else {
            res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un barrio, ciudad, corregimiento o vereda
export async function deleteBarrioCiudadCorregimientoVereda(req, res) {
    try {
        const deletedBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.destroy({
            where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id },
        });
        if (deletedBarrioCiudadCorregimientoVereda) {
            res.json({ message: 'Barrio, ciudad, corregimiento o vereda eliminado' });
        } else {
            res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

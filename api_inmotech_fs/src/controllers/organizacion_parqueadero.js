import OrganizacionParqueadero from '../models/organizacion_parqueadero.js';

// Obtener todos los registros de organizacion_parquedero
export async function getAllOrganizacionParqueadero(req, res) {
    try {
        const allOrganizacionParqueadero = await OrganizacionParqueadero.findAll();
        res.json(allOrganizacionParqueadero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un registro  por ID
export async function getOrganizacionParqueaderoById(req, res) {
    try {
        const OrganizacionParqueaderoId = await OrganizacionParqueadero.findByPk(req.params.id);
        if (OrganizacionParqueaderoId) {
            res.json(OrganizacionParqueaderoId);
        } else {
            res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo registro 
export async function createOrganizacionParqueadero(req, res) {
    try {
        const newOrganizacionParqueadero = await OrganizacionParqueadero.create(req.body);
        res.status(201).json(newOrganizacionParqueadero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un registro 
export async function updateOrganizacionParqueadero(req, res) {
    try {
        const updatedOrganizacionParqueadero = await OrganizacionParqueadero.update(req.body, {
          where: { Organizacion_parqueadero_id: req.params.id },
        });
        if (updatedOrganizacionParqueadero[0]) {
            res.json({ message: 'Registro Organizacion_parqueadero actualizado' });
        } else {
            res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un registro de acerca_edificacion
export async function deleteOrganizacionParqueadero(req, res) {
    try {
        const deletedOrganizacionParqueadero = await OrganizacionParqueadero.destroy({
            where: { Organizacion_parqueadero_id: req.params.id },
        });
        if (deletedOrganizacionParqueadero) {
            res.json({ message: 'Registro Organizacion_parqueadero eliminado' });
        } else {
            res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
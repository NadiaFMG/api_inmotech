
// import OrganizacionParqueadero from '../models/organizacion_parqueadero.js';

// // Obtener todos los registros de organizacion_parquedero
// export async function getAllOrganizacionParqueadero(req, res) {
//     try {
//         const allOrganizacionParqueadero = await OrganizacionParqueadero.findAll();
//         res.json(allOrganizacionParqueadero);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un registro  por ID
// export async function getOrganizacionParqueaderoById(req, res) {
//     try {
//         const OrganizacionParqueaderoId = await OrganizacionParqueadero.findByPk(req.params.id);
//         if (OrganizacionParqueaderoId) {
//             res.json(OrganizacionParqueaderoId);
//         } else {
//             res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo registro 
// export async function createOrganizacionParqueadero(req, res) {
//     try {
//         const newOrganizacionParqueadero = await OrganizacionParqueadero.create(req.body);
//         res.status(201).json(newOrganizacionParqueadero);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un registro 
// export async function updateOrganizacionParqueadero(req, res) {
//     try {
//         const updatedOrganizacionParqueadero = await OrganizacionParqueadero.update(req.body, {
//           where: { Organizacion_parqueadero_id: req.params.id },
//         });
//         if (updatedOrganizacionParqueadero[0]) {
//             res.json({ message: 'Registro Organizacion_parqueadero actualizado' });
//         } else {
//             res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un registro de acerca_edificacion
// export async function deleteOrganizacionParqueadero(req, res) {
//     try {
//         const deletedOrganizacionParqueadero = await OrganizacionParqueadero.destroy({
//             where: { Organizacion_parqueadero_id: req.params.id },
//         });
//         if (deletedOrganizacionParqueadero) {
//             res.json({ message: 'Registro Organizacion_parqueadero eliminado' });
//         } else {
//             res.status(404).json({ message: 'Registro Organizacion_parqueadero no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const ImagenesInmueble = db.ImagenesInmueble;

const ImagenesInmuebleController = {
  async create(req, res) {
    try {
      const imagen = await ImagenesInmueble.create(req.body);
      res.status(201).json(imagen);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const imagenes = await ImagenesInmueble.findAll();
      res.json(imagenes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const imagen = await ImagenesInmueble.findByPk(req.params.id);
      if (!imagen) return res.status(404).json({ error: 'No encontrado' });
      res.json(imagen);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await ImagenesInmueble.update(req.body, {
        where: { Imagenes_inmueble_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const imagen = await ImagenesInmueble.findByPk(req.params.id);
      res.json(imagen);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ImagenesInmueble.destroy({
        where: { Imagenes_inmueble_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Imagen de inmueble eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ImagenesInmuebleController;
// import ciudad from '../models/ciudad.js';

// // Obtener todas las ciudades
// export async function getAllCiudades(req, res) {
//     try {
//         const allCiudades = await ciudad.findAll();
//         res.json(allCiudades);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener una ciudad por ID
// export async function getCiudadById(req, res) {
//     try {
//         const ciudadItem = await ciudad.findByPk(req.params.id);
//         if (ciudadItem) {
//             res.json(ciudadItem);
//         } else {
//             res.status(404).json({ message: 'Ciudad no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear una nueva ciudad
// export async function createCiudad(req, res) {
//     try {
//         const newCiudad = await ciudad.create(req.body);
//         res.status(201).json(newCiudad);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar una ciudad
// export async function updateCiudad(req, res) {
//     try {
//         const updatedCiudad = await ciudad.update(req.body, {
//             where: { Ciudad_id: req.params.id },
//         });
//         if (updatedCiudad[0]) {
//             res.json({ message: 'Ciudad actualizada' });
//         } else {
//             res.status(404).json({ message: 'Ciudad no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar una ciudad
// export async function deleteCiudad(req, res) {
//     try {
//         const deletedCiudad = await ciudad.destroy({
//             where: { Ciudad_id: req.params.id },
//         });
//         if (deletedCiudad) {
//             res.json({ message: 'Ciudad eliminada' });
//         } else {
//             res.status(404).json({ message: 'Ciudad no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Ciudad = db.Ciudad;

const CiudadController = {
  async create(req, res) {
    try {
      const ciudad = await Ciudad.create(req.body);
      res.status(201).json(ciudad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const ciudades = await Ciudad.findAll();
      res.json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const ciudad = await Ciudad.findByPk(req.params.id);
      if (!ciudad) return res.status(404).json({ error: 'No encontrado' });
      res.json(ciudad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Ciudad.update(req.body, {
        where: { Ciudad_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const ciudad = await Ciudad.findByPk(req.params.id);
      res.json(ciudad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Ciudad.destroy({
        where: { Ciudad_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Ciudad eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CiudadController;
// import direccion from '../models/direccion.js';

// // Obtener todas las direcciones
// export async function getAllDirecciones(req, res) {
//     try {
//         const allDirecciones = await direccion.findAll();
//         res.json(allDirecciones);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener una dirección por ID
// export async function getDireccionById(req, res) {
//     try {
//         const direccionItem = await direccion.findByPk(req.params.id);
//         if (direccionItem) {
//             res.json(direccionItem);
//         } else {
//             res.status(404).json({ message: 'Dirección no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear una nueva dirección
// export async function createDireccion(req, res) {
//     try {
//         const newDireccion = await direccion.create(req.body);
//         res.status(201).json(newDireccion);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar una dirección
// export async function updateDireccion(req, res) {
//     try {
//         const updatedDireccion = await direccion.update(req.body, {
//             where: { Direccion_id: req.params.id },
//         });
//         if (updatedDireccion[0]) {
//             res.json({ message: 'Dirección actualizada' });
//         } else {
//             res.status(404).json({ message: 'Dirección no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar una dirección
// export async function deleteDireccion(req, res) {
//     try {
//         const deletedDireccion = await direccion.destroy({
//             where: { Direccion_id: req.params.id },
//         });
//         if (deletedDireccion) {
//             res.json({ message: 'Dirección eliminada' });
//         } else {
//             res.status(404).json({ message: 'Dirección no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Direccion = db.Direccion;

const DireccionController = {
  async create(req, res) {
    try {
      const direccion = await Direccion.create(req.body);
      res.status(201).json(direccion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const direcciones = await Direccion.findAll();
      res.json(direcciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const direccion = await Direccion.findByPk(req.params.id);
      if (!direccion) return res.status(404).json({ error: 'No encontrado' });
      res.json(direccion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Direccion.update(req.body, {
        where: { Direccion_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const direccion = await Direccion.findByPk(req.params.id);
      res.json(direccion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Direccion.destroy({
        where: { Direccion_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Dirección eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = DireccionController;
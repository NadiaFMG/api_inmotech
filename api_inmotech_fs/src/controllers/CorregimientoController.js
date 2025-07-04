// import corregimiento from '../models/corregimiento.js';

// // Obtener todos los corregimientos
// export async function getAllCorregimientos(req, res) {
//     try {
//         const allCorregimientos = await corregimiento.findAll();
//         res.json(allCorregimientos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un corregimiento por ID
// export async function getCorregimientoById(req, res) {
//     try {
//         const corregimientoItem = await corregimiento.findByPk(req.params.id);
//         if (corregimientoItem) {
//             res.json(corregimientoItem);
//         } else {
//             res.status(404).json({ message: 'Corregimiento no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo corregimiento
// export async function createCorregimiento(req, res) {
//     try {
//         const newCorregimiento = await corregimiento.create(req.body);
//         res.status(201).json(newCorregimiento);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un corregimiento
// export async function updateCorregimiento(req, res) {
//     try {
//         const updatedCorregimiento = await corregimiento.update(req.body, {
//             where: { Corregimiento_id: req.params.id },
//         });
//         if (updatedCorregimiento[0]) {
//             res.json({ message: 'Corregimiento actualizado' });
//         } else {
//             res.status(404).json({ message: 'Corregimiento no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un corregimiento
// export async function deleteCorregimiento(req, res) {
//     try {
//         const deletedCorregimiento = await corregimiento.destroy({
//             where: { Corregimiento_id: req.params.id },
//         });
//         if (deletedCorregimiento) {
//             res.json({ message: 'Corregimiento eliminado' });
//         } else {
//             res.status(404).json({ message: 'Corregimiento no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Corregimiento = db.Corregimiento;

const CorregimientoController = {
  async create(req, res) {
    try {
      const corregimiento = await Corregimiento.create(req.body);
      res.status(201).json(corregimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const corregimientos = await Corregimiento.findAll();
      res.json(corregimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const corregimiento = await Corregimiento.findByPk(req.params.id);
      if (!corregimiento) return res.status(404).json({ error: 'No encontrado' });
      res.json(corregimiento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Corregimiento.update(req.body, {
        where: { Corregimiento_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const corregimiento = await Corregimiento.findByPk(req.params.id);
      res.json(corregimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Corregimiento.destroy({
        where: { Corregimiento_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Corregimiento eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CorregimientoController;
// import barrio from '../models/barrio.js';

// // Obtener todos los barrios
// export async function getAllBarrios(req, res) {
//     try {
//         const allBarrios = await barrio.findAll();
//         res.json(allBarrios);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un barrio por ID
// export async function getBarrioById(req, res) {
//     try {
//         const barrioItem = await barrio.findByPk(req.params.id);
//         if (barrioItem) {
//             res.json(barrioItem);
//         } else {
//             res.status(404).json({ message: 'Barrio no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo barrio
// export async function createBarrio(req, res) {
//     try {
//         const newBarrio = await barrio.create(req.body);
//         res.status(201).json(newBarrio);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un barrio
// export async function updateBarrio(req, res) {
//     try {
//         const updatedBarrio = await barrio.update(req.body, {
//             where: { Barrio_id: req.params.id },
//         });
//         if (updatedBarrio[0]) {
//             res.json({ message: 'Barrio actualizado' });
//         } else {
//             res.status(404).json({ message: 'Barrio no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un barrio
// export async function deleteBarrio(req, res) {
//     try {
//         const deletedBarrio = await barrio.destroy({
//             where: { Barrio_id: req.params.id },
//         });
//         if (deletedBarrio) {
//             res.json({ message: 'Barrio eliminado' });
//         } else {
//             res.status(404).json({ message: 'Barrio no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Barrio = db.Barrio;

const BarrioController = {
  async create(req, res) {
    try {
      const barrio = await Barrio.create(req.body);
      res.status(201).json(barrio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const barrios = await Barrio.findAll();
      res.json(barrios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const barrio = await Barrio.findByPk(req.params.id);
      if (!barrio) return res.status(404).json({ error: 'No encontrado' });
      res.json(barrio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Barrio.update(req.body, {
        where: { Barrio_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const barrio = await Barrio.findByPk(req.params.id);
      res.json(barrio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Barrio.destroy({
        where: { Barrio_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Barrio eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = BarrioController;
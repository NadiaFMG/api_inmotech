// import permitions from '../models/permitions.js';

// // Obtener todos los permisos
// export async function getAllPermitions(req, res) {
//     try {
//         const allPermitions = await permitions.findAll();
//         res.json(allPermitions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un permiso por ID
// export async function getPermitionById(req, res) {
//     try {
//         const permition = await permitions.findByPk(req.params.id);
//         if (permition) {
//             res.json(permition);
//         } else {
//             res.status(404).json({ message: 'Permiso no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo permiso
// export async function createPermition(req, res) {
//     try {
//         const newPermition = await permitions.create(req.body);
//         res.status(201).json(newPermition);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un permiso
// export async function updatePermition(req, res) {
//     try {
//         const updatedPermition = await permitions.update(req.body, {
//             where: { Permitions_id: req.params.id },
//         });
//         if (updatedPermition[0]) {
//             res.json({ message: 'Permiso actualizado' });
//         } else {
//             res.status(404).json({ message: 'Permiso no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un permiso
// export async function deletePermition(req, res) {
//     try {
//         const deletedPermition = await permitions.destroy({
//           where: { Permitions_id: req.params.id },
//         });
//         if (deletedPermition) {
//             res.json({ message: 'Permiso eliminado' });
//         } else {
//             res.status(404).json({ message: 'Permiso no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Permitions = db.Permitions;

const PermitionsController = {
  async create(req, res) {
    try {
      const permition = await Permitions.create(req.body);
      res.status(201).json(permition);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const permitions = await Permitions.findAll();
      res.json(permitions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const permition = await Permitions.findByPk(req.params.id);
      if (!permition) return res.status(404).json({ error: 'No encontrado' });
      res.json(permition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Permitions.update(req.body, {
        where: { Permitions_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const permition = await Permitions.findByPk(req.params.id);
      res.json(permition);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Permitions.destroy({
        where: { Permitions_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PermitionsController;
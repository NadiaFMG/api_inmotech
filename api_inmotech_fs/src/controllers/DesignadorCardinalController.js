// import designadorCardinal from '../models/designador_cardinal.js';

// // Obtener todos los designadores cardinales
// export async function getAllDesignadoresCardinales(req, res) {
//     try {
//         const allDesignadoresCardinales = await designadorCardinal.findAll();
//         res.json(allDesignadoresCardinales);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un designador cardinal por ID
// export async function getDesignadorCardinalById(req, res) {
//     try {
//         const designadorCardinalItem = await designadorCardinal.findByPk(req.params.id);
//         if (designadorCardinalItem) {
//             res.json(designadorCardinalItem);
//         } else {
//             res.status(404).json({ message: 'Designador cardinal no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo designador cardinal
// export async function createDesignadorCardinal(req, res) {
//     try {
//         const newDesignadorCardinal = await designadorCardinal.create(req.body);
//         res.status(201).json(newDesignadorCardinal);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un designador cardinal
// export async function updateDesignadorCardinal(req, res) {
//     try {
//         const updatedDesignadorCardinal = await designadorCardinal.update(req.body, {
//             where: { Designador_cardinal_id: req.params.id },
//         });
//         if (updatedDesignadorCardinal[0]) {
//             res.json({ message: 'Designador cardinal actualizado' });
//         } else {
//             res.status(404).json({ message: 'Designador cardinal no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un designador cardinal
// export async function deleteDesignadorCardinal(req, res) {
//     try {
//         const deletedDesignadorCardinal = await designadorCardinal.destroy({
//             where: { Designador_cardinal_id: req.params.id },
//         });
//         if (deletedDesignadorCardinal) {
//             res.json({ message: 'Designador cardinal eliminado' });
//         } else {
//             res.status(404).json({ message: 'Designador cardinal no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const DesignadorCardinal = db.DesignadorCardinal;

const DesignadorCardinalController = {
  async create(req, res) {
    try {
      const designador = await DesignadorCardinal.create(req.body);
      res.status(201).json(designador);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const designadores = await DesignadorCardinal.findAll();
      res.json(designadores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const designador = await DesignadorCardinal.findByPk(req.params.id);
      if (!designador) return res.status(404).json({ error: 'No encontrado' });
      res.json(designador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await DesignadorCardinal.update(req.body, {
        where: { Designador_cardinal_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const designador = await DesignadorCardinal.findByPk(req.params.id);
      res.json(designador);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await DesignadorCardinal.destroy({
        where: { Designador_cardinal_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Designador cardinal eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = DesignadorCardinalController;
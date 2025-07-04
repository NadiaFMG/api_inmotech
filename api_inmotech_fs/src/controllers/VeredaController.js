// import vereda from '../models/vereda.js';

// // Obtener todas las veredas
// export async function getAllVeredas(req, res) {
//     try {
//         const allVeredas = await vereda.findAll();
//         res.json(allVeredas);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener una vereda por ID
// export async function getVeredaById(req, res) {
//     try {
//         const veredaItem = await vereda.findByPk(req.params.id);
//         if (veredaItem) {
//             res.json(veredaItem);
//         } else {
//             res.status(404).json({ message: 'Vereda no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear una nueva vereda
// export async function createVereda(req, res) {
//     try {
//         const newVereda = await vereda.create(req.body);
//         res.status(201).json(newVereda);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar una vereda
// export async function updateVereda(req, res) {
//     try {
//         const updatedVereda = await vereda.update(req.body, {
//             where: { Vereda_id: req.params.id },
//         });
//         if (updatedVereda[0]) {
//             res.json({ message: 'Vereda actualizada' });
//         } else {
//             res.status(404).json({ message: 'Vereda no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// export async function deleteVereda(req, res) {
//     try {
//         const deletedVereda = await vereda.destroy({
//             where: { Vereda_id: req.params.id },
//         });
//         if (deletedVereda) {
//             res.json({ message: 'Vereda eliminada' });
//         } else {
//             res.status(404).json({ message: 'Vereda no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Vereda = db.Vereda;

const VeredaController = {
  async create(req, res) {
    try {
      const vereda = await Vereda.create(req.body);
      res.status(201).json(vereda);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const veredas = await Vereda.findAll();
      res.json(veredas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const vereda = await Vereda.findByPk(req.params.id);
      if (!vereda) return res.status(404).json({ error: 'No encontrado' });
      res.json(vereda);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Vereda.update(req.body, {
        where: { Vereda_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const vereda = await Vereda.findByPk(req.params.id);
      res.json(vereda);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Vereda.destroy({
        where: { Vereda_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Vereda eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = VeredaController;
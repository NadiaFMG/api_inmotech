// import valor from '../models/valor.js';

// // Obtener todos los valores
// export async function getAllValores(req, res) {
//     try {
//         const allValores = await valor.findAll();
//         res.json(allValores);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un valor por ID
// export async function getValorById(req, res) {
//     try {
//         const valorItem = await valor.findByPk(req.params.id);
//         if (valorItem) {
//             res.json(valorItem);
//         } else {
//             res.status(404).json({ message: 'Valor no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo valor
// export async function createValor(req, res) {
//     try {
//         const newValor = await valor.create(req.body);
//         res.status(201).json(newValor);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un valor
// export async function updateValor(req, res) {
//     try {
//         const updatedValor = await valor.update(req.body, {
//             where: { Valor_id: req.params.id },
//         });
//         if (updatedValor[0]) {
//             res.json({ message: 'Valor actualizado' });
//         } else {
//             res.status(404).json({ message: 'Valor no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un valor
// export async function deleteValor(req, res) {
//     try {
//         const deletedValor = await valor.destroy({
//             where: { Valor_id: req.params.id },
//         });
//         if (deletedValor) {
//             res.json({ message: 'Valor eliminado' });
//         } else {
//             res.status(404).json({ message: 'Valor no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Valor = db.Valor;

const ValorController = {
  async create(req, res) {
    try {
      const valor = await Valor.create(req.body);
      res.status(201).json(valor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const valores = await Valor.findAll();
      res.json(valores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const valor = await Valor.findByPk(req.params.id);
      if (!valor) return res.status(404).json({ error: 'No encontrado' });
      res.json(valor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Valor.update(req.body, {
        where: { Valor_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const valor = await Valor.findByPk(req.params.id);
      res.json(valor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Valor.destroy({
        where: { Valor_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ValorController;
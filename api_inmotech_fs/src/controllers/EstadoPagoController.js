// import estadoPago from '../models/estado_pago.js';

// // Obtener todos los estados de pago
// export async function getAllEstadosPago(req, res) {
//     try {
//         const allEstadosPago = await estadoPago.findAll();
//         res.json(allEstadosPago);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un estado de pago por ID
// export async function getEstadoPagoById(req, res) {
//     try {
//         const estadoPagoItem = await estadoPago.findByPk(req.params.id);
//         if (estadoPagoItem) {
//             res.json(estadoPagoItem);
//         } else {
//             res.status(404).json({ message: 'Estado de pago no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo estado de pago
// export async function createEstadoPago(req, res) {
//     try {
//         const newEstadoPago = await estadoPago.create(req.body);
//         res.status(201).json(newEstadoPago);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un estado de pago
// export async function updateEstadoPago(req, res) {
//     try {
//         const updatedEstadoPago = await estadoPago.update(req.body, {
//             where: { Estado_pago_id: req.params.id },
//         });
//         if (updatedEstadoPago[0]) {
//             res.json({ message: 'Estado de pago actualizado' });
//         } else {
//             res.status(404).json({ message: 'Estado de pago no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un estado de pago
// export async function deleteEstadoPago(req, res) {
//     try {
//         const deletedEstadoPago = await estadoPago.destroy({
//             where: { Estado_pago_id: req.params.id },
//         });
//         if (deletedEstadoPago) {
//             res.json({ message: 'Estado de pago eliminado' });
//         } else {
//             res.status(404).json({ message: 'Estado de pago no encontrado' });
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

// import acercaEdificacion from '../models/acerca_edificacion.js';

// // Obtener todos los registros de acerca_edificacion
// export async function getAllAcercaEdificacion(req, res) {
//     try {
//         const allAcercaEdificacion = await acercaEdificacion.findAll();
//         res.json(allAcercaEdificacion);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un registro de acerca_edificacion por ID
// export async function getAcercaEdificacionById(req, res) {
//     try {
//         const acercaEdificacionId = await acercaEdificacion.findByPk(req.params.id);
//         if (acercaEdificacionId) {
//             res.json(acercaEdificacionId);
//         } else {
//             res.status(404).json({ message: 'Registro acerca_edificacion no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo registro de acerca_edificacion
// export async function createAcercaEdificacion(req, res) {
//     try {
//         const newAcercaEdificacion = await acercaEdificacion.create(req.body);
//         res.status(201).json(newAcercaEdificacion);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un registro de acerca_edificacion
// export async function updateAcercaEdificacion(req, res) {
//     try {
//         const updatedAcercaEdificacion = await acercaEdificacion.update(req.body, {
//           where: { Acerca_edificacion_id: req.params.id },
//         });
//         if (updatedAcercaEdificacion[0]) {
//             res.json({ message: 'Registro acerca_edificacion actualizado' });
//         } else {
//             res.status(404).json({ message: 'Registro acerca_edificacion no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un registro de acerca_edificacion
// export async function deleteAcercaEdificacion(req, res) {
//     try {
//         const deletedAcercaEdificacion = await acercaEdificacion.destroy({
//             where: { Acerca_edificacion_id: req.params.id },
//         });
//         if (deletedAcercaEdificacion) {
//             res.json({ message: 'Registro acerca_edificacion eliminado' });
//         } else {
//             res.status(404).json({ message: 'Registro acerca_edificacion no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const AcercaEdificacion = db.AcercaEdificacion;

const AcercaEdificacionController = {
  async create(req, res) {
    try {
      const record = await AcercaEdificacion.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const records = await AcercaEdificacion.findAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const record = await AcercaEdificacion.findByPk(req.params.id);
      if (!record) return res.status(404).json({ error: 'No encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await AcercaEdificacion.update(req.body, {
        where: { Acerca_edificacion_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const record = await AcercaEdificacion.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await AcercaEdificacion.destroy({
        where: { Acerca_edificacion_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Registro acerca_edificacion eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AcercaEdificacionController;
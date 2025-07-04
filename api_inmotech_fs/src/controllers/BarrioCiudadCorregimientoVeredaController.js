// import barrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';

// // Obtener todos los barrios, ciudades, corregimientos o veredas
// export async function getAllBarriosCiudadesCorregimientosVeredas(req, res) {
//     try {
//         const allBarriosCiudadesCorregimientosVeredas = await barrioCiudadCorregimientoVereda.findAll();
//         res.json(allBarriosCiudadesCorregimientosVeredas);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un barrio, ciudad, corregimiento o vereda por ID
// export async function getBarrioCiudadCorregimientoVeredaById(req, res) {
//     try {
//         const barrioCiudadCorregimientoVeredaItem = await barrioCiudadCorregimientoVereda.findByPk(req.params.id);
//         if (barrioCiudadCorregimientoVeredaItem) {
//             res.json(barrioCiudadCorregimientoVeredaItem);
//         } else {
//             res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo barrio, ciudad, corregimiento o vereda
// export async function createBarrioCiudadCorregimientoVereda(req, res) {
//     try {
//         const newBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.create(req.body);
//         res.status(201).json(newBarrioCiudadCorregimientoVereda);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un barrio, ciudad, corregimiento o vereda
// export async function updateBarrioCiudadCorregimientoVereda(req, res) {
//     try {
//         const updatedBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.update(req.body, {
//             where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id },
//         });
//         if (updatedBarrioCiudadCorregimientoVereda[0]) {
//             res.json({ message: 'Barrio, ciudad, corregimiento o vereda actualizado' });
//         } else {
//             res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un barrio, ciudad, corregimiento o vereda
// export async function deleteBarrioCiudadCorregimientoVereda(req, res) {
//     try {
//         const deletedBarrioCiudadCorregimientoVereda = await barrioCiudadCorregimientoVereda.destroy({
//             where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id },
//         });
//         if (deletedBarrioCiudadCorregimientoVereda) {
//             res.json({ message: 'Barrio, ciudad, corregimiento o vereda eliminado' });
//         } else {
//             res.status(404).json({ message: 'Barrio, ciudad, corregimiento o vereda no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const BarrioCiudadCorregimientoVereda = db.BarrioCiudadCorregimientoVereda;

const BarrioCiudadCorregimientoVeredaController = {
  async create(req, res) {
    try {
      const record = await BarrioCiudadCorregimientoVereda.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const records = await BarrioCiudadCorregimientoVereda.findAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const record = await BarrioCiudadCorregimientoVereda.findByPk(req.params.id);
      if (!record) return res.status(404).json({ error: 'No encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await BarrioCiudadCorregimientoVereda.update(req.body, {
        where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const record = await BarrioCiudadCorregimientoVereda.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await BarrioCiudadCorregimientoVereda.destroy({
        where: { Barrio_ciudad_corregimiento_vereda_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Barrio, ciudad, corregimiento o vereda eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = BarrioCiudadCorregimientoVeredaController;
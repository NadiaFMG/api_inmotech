// import division from '../models/division.js';

// // Obtener todas las divisiones
// export async function getAllDivisions(req, res) {
//     try {
//         const allDivisions = await division.findAll();
//         res.json(allDivisions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener una división por ID
// export async function getDivisionById(req, res) {
//     try {
//         const divisionItem = await division.findByPk(req.params.id);
//         if (divisionItem) {
//             res.json(divisionItem);
//         } else {
//             res.status(404).json({ message: 'División no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear una nueva división
// export async function createDivision(req, res) {
//     try {
//         const newDivision = await division.create(req.body);
//         res.status(201).json(newDivision);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar una división
// export async function updateDivision(req, res) {
//     try {
//         const updatedDivision = await division.update(req.body, {
//             where: { Division_id: req.params.id },
//         });
//         if (updatedDivision[0]) {
//             res.json({ message: 'División actualizada' });
//         } else {
//             res.status(404).json({ message: 'División no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar una división
// export async function deleteDivision(req, res) {
//     try {
//         const deletedDivision = await division.destroy({
//             where: { Division_id: req.params.id },
//         });
//         if (deletedDivision) {
//             res.json({ message: 'División eliminada' });
//         } else {
//             res.status(404).json({ message: 'División de identificación no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Division = db.Division;

const DivisionController = {
  async create(req, res) {
    try {
      const division = await Division.create(req.body);
      res.status(201).json(division);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const divisions = await Division.findAll();
      res.json(divisions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const division = await Division.findByPk(req.params.id);
      if (!division) return res.status(404).json({ error: 'No encontrado' });
      res.json(division);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Division.update(req.body, {
        where: { Division_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const division = await Division.findByPk(req.params.id);
      res.json(division);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Division.destroy({
        where: { Division_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'División eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = DivisionController;
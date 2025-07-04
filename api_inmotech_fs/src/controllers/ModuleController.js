// import module from '../models/module.js';

// // Obtener todos los módulos
// export async function getAllModules(req, res) {
//     try {
//         const allModules = await module.findAll();
//         res.json(allModules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un módulo por ID
// export async function getModuleById(req, res) {
//     try {
//         const moduleItem = await module.findByPk(req.params.id);
//         if (moduleItem) {
//             res.json(moduleItem);
//         } else {
//             res.status(404).json({ message: 'Módulo no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo módulo
// export async function createModule(req, res) {
//     try {
//         const newModule = await module.create(req.body);
//         res.status(201).json(newModule);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un módulo
// export async function updateModule(req, res) {
//     try {
//         const updatedModule = await module.update(req.body, {
//             where: { Module_id: req.params.id },
//         });
//         if (updatedModule[0]) {
//             res.json({ message: 'Módulo actualizado' });
//         } else {
//             res.status(404).json({ message: 'Módulo no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un módulo
// export async function deleteModule(req, res) {
//     try {
//         const deletedModule = await module.destroy({
//             where: { Module_id: req.params.id },
//         });
//         if (deletedModule) {
//             res.json({ message: 'Módulo eliminado' });
//         } else {
//             res.status(404).json({ message: 'Módulo no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const db = require('../models');
const Module = db.Module;

const ModuleController = {
  async create(req, res) {
    try {
      const module = await Module.create(req.body);
      res.status(201).json(module);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const modules = await Module.findAll();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const module = await Module.findByPk(req.params.id);
      if (!module) return res.status(404).json({ error: 'No encontrado' });
      res.json(module);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Module.update(req.body, {
        where: { Module_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const module = await Module.findByPk(req.params.id);
      res.json(module);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Module.destroy({
        where: { Module_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ModuleController;
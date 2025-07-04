// import permitionsModuleRole from '../models/permitions_module_role.js';

// // Obtener todos los registros de permitions_module_role
// export async function getAllPermitionsModuleRoles(req, res) {
//     try {
//         const allPermitionsModuleRoles = await permitionsModuleRole.findAll();
//         res.json(allPermitionsModuleRoles);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Obtener un registro de permitions_module_role por ID
// export async function getPermitionsModuleRoleById(req, res) {
//     try {
//         const permitionsModuleRole = await permitionsModuleRole.findByPk(req.params.id);
//         if (permitionsModuleRole) {
//             res.json(permitionsModuleRole);
//         } else {
//             res.status(404).json({ message: 'Registro permitions_module_role no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Crear un nuevo registro de permitions_module_role
// export async function createPermitionsModuleRole(req, res) {
//     try {
//         const newPermitionsModuleRole = await permitionsModuleRole.create(req.body);
//         res.status(201).json(newPermitionsModuleRole);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar un registro de permitions_module_role
// export async function updatePermitionsModuleRole(req, res) {
//     try {
//         const updatedPermitionsModuleRole = await permitionsModuleRole.update(req.body, {
//         where: { Permitions_module_role_id: req.params.id },
//         });
//         if (updatedPermitionsModuleRole[0]) {
//             res.json({ message: 'Registro permitions_module_role actualizado' });
//         } else {
//             res.status(404).json({ message: 'Registro permitions_module_role no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Eliminar un registro de permitions_module_role
// export async function deletePermitionsModuleRole(req, res) {
//     try {
//         const deletedPermitionsModuleRole = await permitionsModuleRole.destroy({
//             where: { Permitions_module_role_id: req.params.id },
//         });
//         if (deletedPermitionsModuleRole) {
//             res.json({ message: 'Registro permitions_module_role eliminado' });
//         } else {
//             res.status(404).json({ message: 'Registro permitions_module_role no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
const db = require('../models');
const PermitionsModuleRole = db.PermitionsModuleRole;

const PermitionsModuleRoleController = {
  async create(req, res) {
    try {
      const record = await PermitionsModuleRole.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const records = await PermitionsModuleRole.findAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const record = await PermitionsModuleRole.findByPk(req.params.id);
      if (!record) return res.status(404).json({ error: 'No encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PermitionsModuleRole.update(req.body, {
        where: { Permitions_module_role_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const record = await PermitionsModuleRole.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PermitionsModuleRole.destroy({
        where: { Permitions_module_role_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PermitionsModuleRoleController;
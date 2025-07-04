// import role from '../models/role.js';

// // Obtener todos los roles
// export async function getAllRoles(req, res) {
//   try {
//     const allRoles = await role.findAll();
//     res.json(allRoles);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Obtener un rol por ID
// export async function getRoleById(req, res) {
//   try {
//     const roleItem = await role.findByPk(req.params.id);
//     if (roleItem) {
//       res.json(roleItem);
//     } else {
//       res.status(404).json({ message: 'Rol no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Crear un nuevo rol
// export async function createRole(req, res) {
//   try {
//     const newRole = await role.create(req.body);
//     res.status(201).json(newRole);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Actualizar un rol
// export async function updateRole(req, res) {
//   try {
//     const updatedRole = await role.update(req.body, {
//       where: { Role_id: req.params.id },
//     });
//     if (updatedRole[0]) {
//       res.json({ message: 'Rol actualizado' });
//     } else {
//       res.status(404).json({ message: 'Rol no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Eliminar un rol
// export async function deleteRole(req, res) {
//   try {
//     const deletedRole = await role.destroy({
//       where: { Role_id: req.params.id },
//     });
//     if (deletedRole) {
//       res.json({ message: 'Rol eliminado' });
//     } else {
//       res.status(404).json({ message: 'Rol no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

const db = require('../models');
const Role = db.Role;

const RoleController = {
  async create(req, res) {
    try {
      const role = await Role.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'No encontrado' });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Role.update(req.body, {
        where: { Role_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const role = await Role.findByPk(req.params.id);
      res.json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Role.destroy({
        where: { Role_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = RoleController;
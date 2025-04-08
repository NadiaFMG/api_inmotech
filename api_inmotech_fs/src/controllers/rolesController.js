import role from '../models/role.js';

// Obtener todos los roles
export async function getAllRoles(req, res) {
  try {
    const allRoles = await role.findAll();
    res.json(allRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un rol por ID
export async function getRoleById(req, res) {
  try {
    const roleItem = await role.findByPk(req.params.id);
    if (roleItem) {
      res.json(roleItem);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo rol
export async function createRole(req, res) {
  try {
    const newRole = await role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un rol
export async function updateRole(req, res) {
  try {
    const updatedRole = await role.update(req.body, {
      where: { Role_id: req.params.id },
    });
    if (updatedRole[0]) {
      res.json({ message: 'Rol actualizado' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un rol
export async function deleteRole(req, res) {
  try {
    const deletedRole = await role.destroy({
      where: { Role_id: req.params.id },
    });
    if (deletedRole) {
      res.json({ message: 'Rol eliminado' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
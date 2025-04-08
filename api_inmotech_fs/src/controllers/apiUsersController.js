import ApiUser from '../models/api_users.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios de la API
export async function getAllApiUsers(req, res) {
  try {
    const allApiUsers = await ApiUser.findAll();
    res.json(allApiUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un usuario de la API por ID
export async function getApiUserById(req, res) {
  try {
    const apiUser = await ApiUser.findByPk(req.params.id);
    if (apiUser) {
      res.json(apiUser);
    } else {
      res.status(404).json({ message: 'Usuario de la API no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo usuario de la API
export async function createApiUser(req, res) {
  try {
    const { Api_user, Api_password, Api_role, Api_status } = req.body;
    const hashedPassword = await bcrypt.hash(Api_password, 10); // Hashea la contraseña
    const newApiUser = await ApiUser.create({
      Api_user,
      Api_password: hashedPassword, // Almacena el hash
      Api_role,
      Api_status,
    });
    res.status(201).json(newApiUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un usuario de la API
export async function updateApiUser(req, res) {
  try {
    const { Api_user, Api_password, Api_role, Api_status } = req.body;
    let updateData = {
      Api_user,
      Api_role,
      Api_status,
    };
    if (Api_password) {
      const hashedPassword = await bcrypt.hash(Api_password, 10); // Hashea la contraseña si se proporciona
      updateData.Api_password = hashedPassword;
    }
    const updatedApiUser = await ApiUser.update(updateData, {
      where: { Api_user_id: req.params.id },
    });
    if (updatedApiUser[0]) {
      res.json({ message: 'Usuario de la API actualizado' });
    } else {
      res.status(404).json({ message: 'Usuario de la API no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un usuario de la API
export async function deleteApiUser(req, res) {
  try {
    const deletedApiUser = await ApiUser.destroy({
      where: { Api_user_id: req.params.id },
    });
    if (deletedApiUser) {
      res.json({ message: 'Usuario de la API eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario de la API no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
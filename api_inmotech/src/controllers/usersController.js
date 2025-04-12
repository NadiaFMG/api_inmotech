import users from '../models/users.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export async function getAllUsers(req, res) {
  try {
    const allUsers = await users.findAll();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un usuario por ID
export async function getUserById(req, res) {
  try {
    const user = await users.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo usuario
export async function createUser(req, res) {
  try {
    const { User_user, User_password, User_status_FK, Role_FK, Suscripcion_FK, Inmueble_FK } = req.body;
    const hashedPassword = await bcrypt.hash(User_password, 10); // Hashea la contraseña
    const newUser = await users.create({
      User_user: User_user,
      User_password: hashedPassword, // Almacena el hash
      User_status_FK: User_status_FK,
      Role_FK: Role_FK,
      Suscripcion_FK: Suscripcion_FK,
      Inmueble_FK: Inmueble_FK,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un usuario
export async function updateUser(req, res) {
  try {
    const { User_user, User_password, User_status_FK, Role_FK, Suscripcion_FK, Inmueble_FK } = req.body;
    let updateData = {
      User_user: User_user,
      User_status_FK: User_status_FK,
      Role_FK: Role_FK,
      Suscripcion_FK: Suscripcion_FK,
      Inmueble_FK: Inmueble_FK,
    };
    if (User_password) {
      const hashedPassword = await bcrypt.hash(User_password, 10); // Hashea la contraseña si se proporciona
      updateData.User_password = hashedPassword;
    }
    const updatedUser = await users.update(updateData, {
      where: { User_id: req.params.id },
    });
    if (updatedUser[0]) {
      res.json({ message: 'Usuario actualizado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un usuario
export async function deleteUser(req, res) {
  try {
    const deletedUser = await users.destroy({
      where: { User_id: req.params.id },
    });
    if (deletedUser) {
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
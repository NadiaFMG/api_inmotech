// import users from '../models/users.js';
// import bcrypt from 'bcrypt';

// // Obtener todos los usuarios
// export async function getAllUsers(req, res) {
//   try {
//     const allUsers = await users.findAll();
//     res.json(allUsers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Obtener un usuario por ID
// export async function getUserById(req, res) {
//   try {
//     const user = await users.findByPk(req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Crear un nuevo usuario
// export async function createUser(req, res) {
//   try {
//     const { User_user, User_password, User_status_FK, Role_FK, Suscripcion_FK, Inmueble_FK } = req.body;
//     const hashedPassword = await bcrypt.hash(User_password, 10); // Hashea la contraseña
//     const newUser = await users.create({
//       User_user: User_user,
//       User_password: hashedPassword, // Almacena el hash
//       User_status_FK: User_status_FK,
//       Role_FK: Role_FK,
//       Suscripcion_FK: Suscripcion_FK,
//       Inmueble_FK: Inmueble_FK,
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Actualizar un usuario
// export async function updateUser(req, res) {
//   try {
//     const { User_user, User_password, User_status_FK, Role_FK, Suscripcion_FK, Inmueble_FK } = req.body;
//     let updateData = {
//       User_user: User_user,
//       User_status_FK: User_status_FK,
//       Role_FK: Role_FK,
//       Suscripcion_FK: Suscripcion_FK,
//       Inmueble_FK: Inmueble_FK,
//     };
//     if (User_password) {
//       const hashedPassword = await bcrypt.hash(User_password, 10); // Hashea la contraseña si se proporciona
//       updateData.User_password = hashedPassword;
//     }
//     const updatedUser = await users.update(updateData, {
//       where: { User_id: req.params.id },
//     });
//     if (updatedUser[0]) {
//       res.json({ message: 'Usuario actualizado' });
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Eliminar un usuario
// export async function deleteUser(req, res) {
//   try {
//     const deletedUser = await users.destroy({
//       where: { User_id: req.params.id },
//     });
//     if (deletedUser) {
//       res.json({ message: 'Usuario eliminado' });
//     } else {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

const db = require('../models');
const Users = db.Users;

const UsersController = {
  async create(req, res) {
    try {
      const user = await Users.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'No encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Users.update(req.body, {
        where: { User_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const user = await Users.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Users.destroy({
        where: { User_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UsersController;
// authController.js
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const bcrypt = require('bcryptjs'); // Cambiado a bcryptjs

const authController = {
  async login(req, res) {
    try {
      const { User_user, password } = req.body;
      if (!User_user || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
      }
      const user = await users.findOne({ where: { User_user } });
      if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      if (user.User_status_FK !== 1) return res.status(403).json({ error: 'Usuario inactivo o bloqueado' });
      const valid = await bcrypt.compare(password, user.User_password);
      if (!valid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      const payload = {
        id: user.User_id,
        username: user.User_user,
        role: user.Role_FK,
        status: user.User_status_FK
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.json({ token, user: payload });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async register(req, res) {
    try {
      const { User_user, password, Role_FK, User_status_FK } = req.body;
      if (!User_user || !password || !Role_FK || !User_status_FK) {
        return res.status(400).json({ error: 'Usuario, contraseña, rol y estado requeridos' });
      }
      const exists = await users.findOne({ where: { User_user } });
      if (exists) return res.status(409).json({ error: 'El usuario ya existe' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        User_user,
        User_password: hashedPassword,
        Role_FK,
        User_status_FK
      });
      // No devolver la contraseña
      const { User_password, ...userData } = newUser.toJSON();
      res.status(201).json(userData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
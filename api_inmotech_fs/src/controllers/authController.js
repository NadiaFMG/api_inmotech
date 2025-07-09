// authController.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const PlatformUser = db.PlatformUser;
// const { PlatformUser } = require('../models/PlatformUser');
const bcrypt = require('bcryptjs');

const authController = {
  async login(req, res) {
    try {
      const { Username, password } = req.body;
      if (!Username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
      }
      // Buscar usuario por Username
      const user = await PlatformUser.findOne({ where: { Username } });
      if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      if (user.Platform_user_status_FK !== 1) return res.status(403).json({ error: 'Usuario inactivo o bloqueado' });
      const valid = await bcrypt.compare(password, user.Password);
      if (!valid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      const payload = {
        id: user.Platform_user_id,
        username: user.Username,
        role: user.Platform_role_FK,
        status: user.Platform_user_status_FK
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.json({ token, user: payload });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async register(req, res) {
    try {
      const { Username, password } = req.body;
      if (!Username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
      }
      const Platform_role_FK = 2;
      const Platform_user_status_FK = 1;
      const exists = await PlatformUser.findOne({ where: { Username } });
      if (exists) return res.status(409).json({ error: 'El usuario ya existe' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await PlatformUser.create({
        Username,
        Password: hashedPassword,
        Platform_role_FK,
        Platform_user_status_FK
      });
      // No devolver la contraseña
      const { Password, ...userData } = newUser.toJSON();
      res.status(201).json(userData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
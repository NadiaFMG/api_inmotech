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
        return res.status(400).json({ error: 'Usuario/correo y contraseña requeridos' });
      }
      // Buscar usuario por Username o email
      const user = await PlatformUser.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { Username: Username },
            { email: Username }
          ]
        }
      });
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

  async checkUsuario(req, res) {
    try {
      const { usuario } = req.query;
      if (!usuario) return res.status(400).json({ disponible: false, error: 'Usuario requerido' });
      const exists = await PlatformUser.findOne({ where: { Username: usuario } });
      res.json({ disponible: !exists });
    } catch (error) {
      res.status(500).json({ disponible: false, error: error.message });
    }
  },

  async checkCorreo(req, res) {
    try {
      const { correo } = req.query;
      if (!correo) return res.status(400).json({ disponible: false, error: 'Correo requerido' });
      const exists = await PlatformUser.findOne({ where: { email: correo } });
      res.json({ disponible: !exists });
    } catch (error) {
      res.status(500).json({ disponible: false, error: error.message });
    }
  },

  async register(req, res) {
  try {
    const { Username, email, password } = req.body;
    if (!Username || !email || !password) {
      return res.status(400).json({ error: 'Usuario, correo y contraseña requeridos' });
    }
    const Platform_role_FK = 2;
    const Platform_user_status_FK = 1;
    const exists = await PlatformUser.findOne({ where: { Username } });
    if (exists) return res.status(409).json({ error: 'El usuario ya existe' });
    const existsEmail = await PlatformUser.findOne({ where: { email } });
    if (existsEmail) return res.status(409).json({ error: 'El correo ya está registrado' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await PlatformUser.create({
      Username,
      email, // <-- guarda el email
      Password: hashedPassword,
      Platform_role_FK,
      Platform_user_status_FK
    });
    const { Password, ...userData } = newUser.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
};

module.exports = authController;
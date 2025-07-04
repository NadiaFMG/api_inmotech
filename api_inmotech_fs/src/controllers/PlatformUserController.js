const db = require('../models');
const PlatformUser = db.PlatformUser;
const bcrypt = require('bcryptjs');

const PlatformUserController = {
  async create(req, res) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const user = await PlatformUser.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await PlatformUser.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const user = await PlatformUser.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'No encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const [updated] = await PlatformUser.update(req.body, {
        where: { Platform_user_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const user = await PlatformUser.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformUser.destroy({
        where: { Platform_user_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformUserController;
const db = require('../models');
const PlatformRole = db.PlatformRole;

const PlatformRoleController = {
  async create(req, res) {
    try {
      const role = await PlatformRole.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const roles = await PlatformRole.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const role = await PlatformRole.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'No encontrado' });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformRole.update(req.body, {
        where: { Platform_role_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const role = await PlatformRole.findByPk(req.params.id);
      res.json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformRole.destroy({
        where: { Platform_role_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformRoleController;
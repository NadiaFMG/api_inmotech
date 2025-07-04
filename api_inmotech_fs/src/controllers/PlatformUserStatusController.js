const db = require('../models');
const PlatformUserStatus = db.PlatformUserStatus;

const PlatformUserStatusController = {
  async create(req, res) {
    try {
      const status = await PlatformUserStatus.create(req.body);
      res.status(201).json(status);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const statuses = await PlatformUserStatus.findAll();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const status = await PlatformUserStatus.findByPk(req.params.id);
      if (!status) return res.status(404).json({ error: 'No encontrado' });
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformUserStatus.update(req.body, {
        where: { Platform_user_status_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const status = await PlatformUserStatus.findByPk(req.params.id);
      res.json(status);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformUserStatus.destroy({
        where: { Platform_user_status_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformUserStatusController;
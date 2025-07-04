const db = require('../models');
const PlatformPermitions = db.PlatformPermitions;

const PlatformPermitionsController = {
  async create(req, res) {
    try {
      const permition = await PlatformPermitions.create(req.body);
      res.status(201).json(permition);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const permitions = await PlatformPermitions.findAll();
      res.json(permitions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const permition = await PlatformPermitions.findByPk(req.params.id);
      if (!permition) return res.status(404).json({ error: 'No encontrado' });
      res.json(permition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformPermitions.update(req.body, {
        where: { Platform_permitions_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const permition = await PlatformPermitions.findByPk(req.params.id);
      res.json(permition);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformPermitions.destroy({
        where: { Platform_permitions_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformPermitionsController;
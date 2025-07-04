const db = require('../models');
const PlatformModule = db.PlatformModule;

const PlatformModuleController = {
  async create(req, res) {
    try {
      const module = await PlatformModule.create(req.body);
      res.status(201).json(module);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const modules = await PlatformModule.findAll();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const module = await PlatformModule.findByPk(req.params.id);
      if (!module) return res.status(404).json({ error: 'No encontrado' });
      res.json(module);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformModule.update(req.body, {
        where: { Platform_module_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const module = await PlatformModule.findByPk(req.params.id);
      res.json(module);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformModule.destroy({
        where: { Platform_module_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformModuleController;
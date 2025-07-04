const db = require('../models');
const PlatformModuleRole = db.PlatformModuleRole;

const PlatformModuleRoleController = {
  async create(req, res) {
    try {
      const record = await PlatformModuleRole.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const records = await PlatformModuleRole.findAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const record = await PlatformModuleRole.findByPk(req.params.id);
      if (!record) return res.status(404).json({ error: 'No encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformModuleRole.update(req.body, {
        where: { Platform_module_role_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const record = await PlatformModuleRole.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformModuleRole.destroy({
        where: { Platform_module_role_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformModuleRoleController;
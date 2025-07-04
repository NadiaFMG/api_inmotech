const db = require('../models');
const PlatformProfile = db.PlatformProfile;

const PlatformProfileController = {
  async create(req, res) {
    try {
      const profile = await PlatformProfile.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const profiles = await PlatformProfile.findAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const profile = await PlatformProfile.findByPk(req.params.id);
      if (!profile) return res.status(404).json({ error: 'No encontrado' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformProfile.update(req.body, {
        where: { Platform_profile_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const profile = await PlatformProfile.findByPk(req.params.id);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformProfile.destroy({
        where: { Platform_profile_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformProfileController;
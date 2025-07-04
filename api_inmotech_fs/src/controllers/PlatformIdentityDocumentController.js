const db = require('../models');
const PlatformIdentityDocument = db.PlatformIdentityDocument;

const PlatformIdentityDocumentController = {
  async create(req, res) {
    try {
      const doc = await PlatformIdentityDocument.create(req.body);
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const docs = await PlatformIdentityDocument.findAll();
      res.json(docs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const doc = await PlatformIdentityDocument.findByPk(req.params.id);
      if (!doc) return res.status(404).json({ error: 'No encontrado' });
      res.json(doc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformIdentityDocument.update(req.body, {
        where: { Platform_identity_document_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const doc = await PlatformIdentityDocument.findByPk(req.params.id);
      res.json(doc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformIdentityDocument.destroy({
        where: { Platform_identity_document_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PlatformIdentityDocumentController;
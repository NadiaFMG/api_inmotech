const db = require('../models');
const Impuesto = db.Impuesto;

const ImpuestoController = {
  async create(req, res) {
    try {
      const impuesto = await Impuesto.create(req.body);
      res.status(201).json(impuesto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const impuestos = await Impuesto.findAll();
      res.json(impuestos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const impuesto = await Impuesto.findByPk(req.params.id);
      if (!impuesto) return res.status(404).json({ error: 'No encontrado' });
      res.json(impuesto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Impuesto.update(req.body, {
        where: { Impuesto_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const impuesto = await Impuesto.findByPk(req.params.id);
      res.json(impuesto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Impuesto.destroy({
        where: { Impuesto_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ImpuestoController;
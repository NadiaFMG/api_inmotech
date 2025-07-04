const db = require('../models');
const Factura = db.Factura;

const FacturaController = {
  async create(req, res) {
    try {
      const factura = await Factura.create(req.body);
      res.status(201).json(factura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const facturas = await Factura.findAll();
      res.json(facturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const factura = await Factura.findByPk(req.params.id);
      if (!factura) return res.status(404).json({ error: 'No encontrado' });
      res.json(factura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Factura.update(req.body, {
        where: { Factura_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const factura = await Factura.findByPk(req.params.id);
      res.json(factura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Factura.destroy({
        where: { Factura_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = FacturaController;
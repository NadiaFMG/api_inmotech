const db = require('../models');
const Pago = db.Pago;

const PagoController = {
  async create(req, res) {
    try {
      const pago = await Pago.create(req.body);
      res.status(201).json(pago);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const pagos = await Pago.findAll();
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const pago = await Pago.findByPk(req.params.id);
      if (!pago) return res.status(404).json({ error: 'No encontrado' });
      res.json(pago);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Pago.update(req.body, {
        where: { Pago_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const pago = await Pago.findByPk(req.params.id);
      res.json(pago);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Pago.destroy({
        where: { Pago_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PagoController;
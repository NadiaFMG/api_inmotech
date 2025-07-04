const db = require('../models');
const ImpuestoValor = db.ImpuestoValor;

const ImpuestoValorController = {
  async create(req, res) {
    try {
      const valor = await ImpuestoValor.create(req.body);
      res.status(201).json(valor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const valores = await ImpuestoValor.findAll();
      res.json(valores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const valor = await ImpuestoValor.findByPk(req.params.id);
      if (!valor) return res.status(404).json({ error: 'No encontrado' });
      res.json(valor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await ImpuestoValor.update(req.body, {
        where: { Impuesto_valor_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const valor = await ImpuestoValor.findByPk(req.params.id);
      res.json(valor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ImpuestoValor.destroy({
        where: { Impuesto_valor_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ImpuestoValorController;
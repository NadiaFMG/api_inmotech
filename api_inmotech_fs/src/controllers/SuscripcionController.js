const db = require('../models');
const Suscripcion = db.Suscripcion;

const SuscripcionController = {
  async create(req, res) {
    try {
      const suscripcion = await Suscripcion.create(req.body);
      res.status(201).json(suscripcion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const suscripciones = await Suscripcion.findAll();
      res.json(suscripciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'No encontrado' });
      res.json(suscripcion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Suscripcion.update(req.body, {
        where: { Suscripcion_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      res.json(suscripcion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Suscripcion.destroy({
        where: { Suscripcion_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SuscripcionController;
const db = require('../models');
const Asignacion = db.Asignacion;

const AsignacionController = {
  async create(req, res) {
    try {
      const record = await Asignacion.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const records = await Asignacion.findAll();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const record = await Asignacion.findByPk(req.params.id);
      if (!record) return res.status(404).json({ error: 'No encontrado' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Asignacion.update(req.body, {
        where: { Asignacion_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const record = await Asignacion.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Asignacion.destroy({
        where: { Asignacion_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Registro Asignacion eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AsignacionController;
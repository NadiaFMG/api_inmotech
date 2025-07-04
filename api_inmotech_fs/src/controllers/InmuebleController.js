const db = require('../models');
const TipoEdificacion = db.TipoEdificacion;

const TipoEdificacionController = {
  async create(req, res) {
    try {
      const tipo = await TipoEdificacion.create(req.body);
      res.status(201).json(tipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const tipos = await TipoEdificacion.findAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const tipo = await TipoEdificacion.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'No encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await TipoEdificacion.update(req.body, {
        where: { Tipo_edificacion_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const tipo = await TipoEdificacion.findByPk(req.params.id);
      res.json(tipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await TipoEdificacion.destroy({
        where: { Tipo_edificacion_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Tipo de edificación eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = TipoEdificacionController;
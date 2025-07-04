const db = require('../models');
const ResolucionFactura = db.ResolucionFactura;

const ResolucionFacturaController = {
  async create(req, res) {
    try {
      const resolucion = await ResolucionFactura.create(req.body);
      res.status(201).json(resolucion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const resoluciones = await ResolucionFactura.findAll();
      res.json(resoluciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const resolucion = await ResolucionFactura.findByPk(req.params.id);
      if (!resolucion) return res.status(404).json({ error: 'No encontrado' });
      res.json(resolucion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await ResolucionFactura.update(req.body, {
        where: { Resolucion_factura_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const resolucion = await ResolucionFactura.findByPk(req.params.id);
      res.json(resolucion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ResolucionFactura.destroy({
        where: { Resolucion_factura_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ResolucionFacturaController;
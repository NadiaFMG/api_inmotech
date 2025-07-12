const db = require('../models');
const Inmueble = db.Inmueble;

const InmuebleController = {
  async create(req, res) {
    try {
      const inmueble = await Inmueble.create(req.body);
      res.status(201).json(inmueble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const inmuebles = await Inmueble.findAll();
      res.json(inmuebles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const inmueble = await Inmueble.findByPk(req.params.id);
      if (!inmueble) return res.status(404).json({ error: 'No encontrado' });
      res.json(inmueble);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Inmueble.update(req.body, {
        where: { Inmueble_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const inmueble = await Inmueble.findByPk(req.params.id);
      res.json(inmueble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Inmueble.destroy({
        where: { Inmueble_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Inmueble eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = InmuebleController;
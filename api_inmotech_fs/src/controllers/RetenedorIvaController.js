const db = require('../models');
const RetenedorIva = db.RetenedorIva;

const RetenedorIvaController = {
  async create(req, res) {
    try {
      // Validar campos requeridos
      const { Porcentaje_retencion } = req.body;
      if (Porcentaje_retencion === undefined) {
        return res.status(400).json({ error: 'Porcentaje_retencion es requerido' });
      }
      const retenedor = await RetenedorIva.create({
        Porcentaje_retencion,
        Activo: req.body.Activo !== undefined ? req.body.Activo : 1
      });
      res.status(201).json(retenedor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const retenedores = await RetenedorIva.findAll();
      res.json(retenedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const retenedor = await RetenedorIva.findByPk(req.params.id);
      if (!retenedor) return res.status(404).json({ error: 'No encontrado' });
      res.json(retenedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { Porcentaje_retencion, Activo } = req.body;
      const [updated] = await RetenedorIva.update(
        { Porcentaje_retencion, Activo },
        { where: { Retenedor_IVA_id: req.params.id } }
      );
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const retenedor = await RetenedorIva.findByPk(req.params.id);
      res.json(retenedor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await RetenedorIva.destroy({
        where: { Retenedor_IVA_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = RetenedorIvaController;
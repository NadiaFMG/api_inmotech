const express = require('express');
const router = express.Router();
const TerminosYCondicionesController = require('../controllers/TerminosYCondicionesController');

// Crear
router.post('/', TerminosYCondicionesController.create);
// Listar todos
router.get('/', TerminosYCondicionesController.findAll);
// Obtener por ID
router.get('/:id', TerminosYCondicionesController.findById);
// Actualizar
router.put('/:id', TerminosYCondicionesController.update);
// Eliminar
router.delete('/:id', TerminosYCondicionesController.delete);

module.exports = router;

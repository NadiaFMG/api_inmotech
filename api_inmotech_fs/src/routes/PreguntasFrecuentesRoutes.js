const express = require('express');
const router = express.Router();
const PreguntasFrecuentesController = require('../controllers/PreguntasFrecuentesController');

// Crear
router.post('/', PreguntasFrecuentesController.create);
// Listar todos
router.get('/', PreguntasFrecuentesController.findAll);
// Obtener por ID
router.get('/:id', PreguntasFrecuentesController.findById);
// Actualizar
router.put('/:id', PreguntasFrecuentesController.update);
// Eliminar
router.delete('/:id', PreguntasFrecuentesController.delete);

module.exports = router;

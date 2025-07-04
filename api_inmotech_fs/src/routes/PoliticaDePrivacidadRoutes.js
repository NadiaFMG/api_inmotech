const express = require('express');
const router = express.Router();
const PoliticaDePrivacidadController = require('../controllers/PoliticaDePrivacidadController');

// Crear
router.post('/', PoliticaDePrivacidadController.create);
// Listar todos
router.get('/', PoliticaDePrivacidadController.findAll);
// Obtener por ID
router.get('/:id', PoliticaDePrivacidadController.findById);
// Actualizar
router.put('/:id', PoliticaDePrivacidadController.update);
// Eliminar
router.delete('/:id', PoliticaDePrivacidadController.delete);

module.exports = router;

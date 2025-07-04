const express = require('express');
const router = express.Router();
const CarruselController = require('../controllers/CarruselController');

// Crear
router.post('/', CarruselController.create);
// Listar todos
router.get('/', CarruselController.findAll);
// Obtener por ID
router.get('/:id', CarruselController.findById);
// Actualizar
router.put('/:id', CarruselController.update);
// Eliminar
router.delete('/:id', CarruselController.delete);

module.exports = router;

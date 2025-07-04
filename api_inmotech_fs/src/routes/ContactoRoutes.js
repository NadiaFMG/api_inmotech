const express = require('express');
const router = express.Router();
const ContactoController = require('../controllers/ContactoController');

// Crear
router.post('/', ContactoController.create);
// Listar todos
router.get('/', ContactoController.findAll);
// Obtener por ID
router.get('/:id', ContactoController.findById);
// Actualizar
router.put('/:id', ContactoController.update);
// Eliminar
router.delete('/:id', ContactoController.delete);

module.exports = router;

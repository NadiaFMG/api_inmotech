const express = require('express');
const router = express.Router();
const SobreNosotrosController = require('../controllers/SobreNosotrosController');

// Crear
router.post('/', SobreNosotrosController.create);
// Listar todos
router.get('/', SobreNosotrosController.findAll);
// Obtener por ID
router.get('/:id', SobreNosotrosController.findById);
// Actualizar
router.put('/:id', SobreNosotrosController.update);
// Eliminar
router.delete('/:id', SobreNosotrosController.delete);

module.exports = router;

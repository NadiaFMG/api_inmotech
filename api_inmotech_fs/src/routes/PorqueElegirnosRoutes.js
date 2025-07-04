const express = require('express');
const router = express.Router();
const PorqueElegirnosController = require('../controllers/PorqueElegirnosController');

// Crear
router.post('/', PorqueElegirnosController.create);
// Listar todos
router.get('/', PorqueElegirnosController.findAll);
// Obtener por ID
router.get('/:id', PorqueElegirnosController.findById);
// Actualizar
router.put('/:id', PorqueElegirnosController.update);
// Eliminar
router.delete('/:id', PorqueElegirnosController.delete);

module.exports = router;

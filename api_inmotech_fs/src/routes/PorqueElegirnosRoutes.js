const express = require('express');
const router = express.Router();
const PorqueElegirnosController = require('../controllers/PorqueElegirnosController');
 const verifyToken = require('../middlewares/verifyToken');


// Crear
router.post('/', verifyToken, PorqueElegirnosController.create);
// Listar todos
router.get('/', verifyToken, PorqueElegirnosController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, PorqueElegirnosController.findById);
// Actualizar
router.put('/:id', verifyToken, PorqueElegirnosController.update);
// Eliminar
router.delete('/:id', verifyToken, PorqueElegirnosController.delete);

module.exports = router;

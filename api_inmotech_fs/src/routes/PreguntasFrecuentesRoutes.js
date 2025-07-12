const express = require('express');
const router = express.Router();
const PreguntasFrecuentesController = require('../controllers/PreguntasFrecuentesController');
 const verifyToken = require('../middlewares/verifyToken');


// Crear
router.post('/', verifyToken, PreguntasFrecuentesController.create);
// Listar todos
router.get('/', verifyToken, PreguntasFrecuentesController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, PreguntasFrecuentesController.findById);
// Actualizar
router.put('/:id', verifyToken, PreguntasFrecuentesController.update);
// Eliminar
router.delete('/:id', verifyToken, PreguntasFrecuentesController.delete);

module.exports = router;

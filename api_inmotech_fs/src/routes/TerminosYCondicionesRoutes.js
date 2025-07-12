const express = require('express');
const router = express.Router();
const TerminosYCondicionesController = require('../controllers/TerminosYCondicionesController');
 const verifyToken = require('../middlewares/verifyToken');


// Crear
router.post('/', verifyToken, TerminosYCondicionesController.create);
// Listar todos
router.get('/', verifyToken, TerminosYCondicionesController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, TerminosYCondicionesController.findById);
// Actualizar
router.put('/:id', verifyToken, TerminosYCondicionesController.update);
// Eliminar
router.delete('/:id', verifyToken, TerminosYCondicionesController.delete);

module.exports = router;

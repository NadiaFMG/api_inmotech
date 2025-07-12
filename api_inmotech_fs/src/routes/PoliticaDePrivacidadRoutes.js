const express = require('express');
const router = express.Router();
const PoliticaDePrivacidadController = require('../controllers/PoliticaDePrivacidadController');
 const verifyToken = require('../middlewares/verifyToken');


// Crear
router.post('/', verifyToken, PoliticaDePrivacidadController.create);
// Listar todos
router.get('/', verifyToken, PoliticaDePrivacidadController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, PoliticaDePrivacidadController.findById);
// Actualizar
router.put('/:id', verifyToken, PoliticaDePrivacidadController.update);
// Eliminar
router.delete('/:id', verifyToken, PoliticaDePrivacidadController.delete);

module.exports = router;

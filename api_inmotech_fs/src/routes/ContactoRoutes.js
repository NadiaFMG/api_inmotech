const express = require('express');
const router = express.Router();
const ContactoController = require('../controllers/ContactoController');
 const verifyToken = require('../middlewares/verifyToken');


// Crear
router.post('/', verifyToken, ContactoController.create);
// Listar todos
router.get('/', verifyToken, ContactoController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, ContactoController.findById);
// Actualizar
router.put('/:id', verifyToken, ContactoController.update);
// Eliminar
router.delete('/:id', verifyToken, ContactoController.delete);

module.exports = router;

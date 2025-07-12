const express = require('express');
const RetenedorIvaController = require('../controllers/RetenedorIvaController');
 const verifyToken = require('../middlewares/verifyToken');
 
const router = express.Router();

// Obtener todos los retenedores de IVA
router.get('/', verifyToken, RetenedorIvaController.findAll);
// Obtener un retenedor de IVA por ID
router.get('/:id', verifyToken, RetenedorIvaController.findById);
// Crear un nuevo retenedor de IVA
router.post('/', verifyToken, RetenedorIvaController.create);
// Actualizar un retenedor de IVA existente
router.put('/:id', verifyToken, RetenedorIvaController.update);
// Eliminar un retenedor de IVA
router.delete('/:id', verifyToken, RetenedorIvaController.delete);

module.exports = router;
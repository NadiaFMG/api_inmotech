const express = require('express');
const RetenedorIvaController = require('../controllers/RetenedorIvaController');
const router = express.Router();

// Obtener todos los retenedores de IVA
router.get('/', RetenedorIvaController.findAll);
// Obtener un retenedor de IVA por ID
router.get('/:id', RetenedorIvaController.findById);
// Crear un nuevo retenedor de IVA
router.post('/', RetenedorIvaController.create);
// Actualizar un retenedor de IVA existente
router.put('/:id', RetenedorIvaController.update);
// Eliminar un retenedor de IVA
router.delete('/:id', RetenedorIvaController.delete);

module.exports = router;
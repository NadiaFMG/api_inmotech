const express = require('express');
const ImpuestoValorController = require('../controllers/ImpuestoValorController');
const router = express.Router();

router.get('/', ImpuestoValorController.findAll);
router.get('/:id', ImpuestoValorController.findById);
router.post('/', ImpuestoValorController.create);
router.put('/:id', ImpuestoValorController.update);
router.delete('/:id', ImpuestoValorController.delete);

module.exports = router;
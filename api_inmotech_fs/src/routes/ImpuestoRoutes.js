const express = require('express');
const ImpuestoController = require('../controllers/ImpuestoController');
const router = express.Router();

router.get('/', ImpuestoController.findAll);
router.get('/:id', ImpuestoController.findById);
router.post('/', ImpuestoController.create);
router.put('/:id', ImpuestoController.update);
router.delete('/:id', ImpuestoController.delete);

module.exports = router;
const express = require('express');
const PagoController = require('../controllers/PagoController');
const router = express.Router();

router.get('/', PagoController.findAll);
router.get('/:id', PagoController.findById);
router.post('/', PagoController.create);
router.put('/:id', PagoController.update);
router.delete('/:id', PagoController.delete);

module.exports = router;
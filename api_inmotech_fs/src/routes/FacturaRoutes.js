const express = require('express');
const FacturaController = require('../controllers/FacturaController');
const router = express.Router();

router.get('/', FacturaController.findAll);
router.get('/:id', FacturaController.findById);
router.post('/', FacturaController.create);
router.put('/:id', FacturaController.update);
router.delete('/:id', FacturaController.delete);

module.exports = router;
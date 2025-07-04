const express = require('express');
const ResolucionFacturaController = require('../controllers/ResolucionFacturaController');
const router = express.Router();

router.get('/', ResolucionFacturaController.findAll);
router.get('/:id', ResolucionFacturaController.findById);
router.post('/', ResolucionFacturaController.create);
router.put('/:id', ResolucionFacturaController.update);
router.delete('/:id', ResolucionFacturaController.delete);

module.exports = router;
const express = require('express');
const ResolucionFacturaController = require('../controllers/ResolucionFacturaController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, ResolucionFacturaController.findAll);
router.get('/:id', verifyToken, ResolucionFacturaController.findById);
router.post('/', verifyToken, ResolucionFacturaController.create);
router.put('/:id', verifyToken, ResolucionFacturaController.update);
router.delete('/:id', verifyToken, ResolucionFacturaController.delete);

module.exports = router;
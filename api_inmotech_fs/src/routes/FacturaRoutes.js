const express = require('express');
const FacturaController = require('../controllers/FacturaController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, FacturaController.findAll);
router.get('/:id', verifyToken, FacturaController.findById);
router.post('/', verifyToken, FacturaController.create);
router.put('/:id', verifyToken, FacturaController.update);
router.delete('/:id', verifyToken, FacturaController.delete);

module.exports = router;
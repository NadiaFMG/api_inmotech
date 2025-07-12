const express = require('express');
const ImpuestoValorController = require('../controllers/ImpuestoValorController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, ImpuestoValorController.findAll);
router.get('/:id', verifyToken, ImpuestoValorController.findById);
router.post('/', verifyToken, ImpuestoValorController.create);
router.put('/:id', verifyToken, ImpuestoValorController.update);
router.delete('/:id', verifyToken, ImpuestoValorController.delete);

module.exports = router;
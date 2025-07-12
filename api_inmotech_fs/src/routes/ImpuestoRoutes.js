const express = require('express');
const ImpuestoController = require('../controllers/ImpuestoController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, ImpuestoController.findAll);
router.get('/:id', verifyToken, ImpuestoController.findById);
router.post('/', verifyToken, ImpuestoController.create);
router.put('/:id', verifyToken, ImpuestoController.update);
router.delete('/:id', verifyToken, ImpuestoController.delete);

module.exports = router;
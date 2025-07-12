const express = require('express');
const PagoController = require('../controllers/PagoController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, PagoController.findAll);
router.get('/:id', verifyToken, PagoController.findById);
router.post('/', verifyToken, PagoController.create);
router.put('/:id', verifyToken, PagoController.update);
router.delete('/:id', verifyToken, PagoController.delete);

module.exports = router;
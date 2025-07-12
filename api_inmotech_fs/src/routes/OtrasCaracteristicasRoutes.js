const express = require('express');
const OtrasCaracteristicasController = require('../controllers/OtrasCaracteristicasController');
 const verifyToken = require('../middlewares/verifyToken');
 
const router = express.Router();

router.get('/', verifyToken, OtrasCaracteristicasController.findAll);
router.get('/:id', verifyToken, OtrasCaracteristicasController.findById);
router.post('/', verifyToken, OtrasCaracteristicasController.create);
router.put('/:id', verifyToken, OtrasCaracteristicasController.update);
router.delete('/:id', verifyToken, OtrasCaracteristicasController.delete);

module.exports = router;
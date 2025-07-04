const express = require('express');
const OtrasCaracteristicasController = require('../controllers/OtrasCaracteristicasController');
const router = express.Router();

router.get('/', OtrasCaracteristicasController.findAll);
router.get('/:id', OtrasCaracteristicasController.findById);
router.post('/', OtrasCaracteristicasController.create);
router.put('/:id', OtrasCaracteristicasController.update);
router.delete('/:id', OtrasCaracteristicasController.delete);

module.exports = router;
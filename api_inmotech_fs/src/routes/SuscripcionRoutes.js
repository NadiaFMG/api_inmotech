const express = require('express');
const SuscripcionController = require('../controllers/SuscripcionController');
const router = express.Router();

router.get('/', SuscripcionController.findAll);
router.get('/:id', SuscripcionController.findById);
router.post('/', SuscripcionController.create);
router.put('/:id', SuscripcionController.update);
router.delete('/:id', SuscripcionController.delete);

module.exports = router;
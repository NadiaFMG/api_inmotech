const express = require('express');
const InmuebleController = require('../controllers/InmuebleController');
const router = express.Router();

router.get('/', InmuebleController.findAll);
router.get('/:id', InmuebleController.findById);
router.post('/', InmuebleController.create);
router.put('/:id', InmuebleController.update);
router.delete('/:id', InmuebleController.delete);

module.exports = router;
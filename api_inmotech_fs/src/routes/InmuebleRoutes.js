const express = require('express');
const InmuebleController = require('../controllers/InmuebleController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, InmuebleController.findAll);
router.get('/:id', verifyToken, InmuebleController.findById);
router.post('/', verifyToken, InmuebleController.create);
router.put('/:id', verifyToken, InmuebleController.update);
router.delete('/:id', verifyToken, InmuebleController.delete);

module.exports = router;
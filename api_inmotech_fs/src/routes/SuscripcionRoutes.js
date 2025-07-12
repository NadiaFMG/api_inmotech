const express = require('express');
const SuscripcionController = require('../controllers/SuscripcionController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, SuscripcionController.findAll);
router.get('/:id', verifyToken, SuscripcionController.findById);
router.post('/', verifyToken, SuscripcionController.create);
router.put('/:id', verifyToken, SuscripcionController.update);
router.delete('/:id', verifyToken, SuscripcionController.delete);

module.exports = router;
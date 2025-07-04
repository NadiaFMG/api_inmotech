const express = require('express');
const PlatformUserController = require('../controllers/PlatformUserController');
const router = express.Router();

router.get('/', PlatformUserController.findAll);
router.get('/:id', PlatformUserController.findById);
router.post('/', PlatformUserController.create);
router.put('/:id', PlatformUserController.update);
router.delete('/:id', PlatformUserController.delete);

module.exports = router;